from html.parser import HTMLParser

class RunnerHTMLParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)
        self.page_tokens = []

    def handle_starttag(self, tag, attrs):
        self.page_tokens.append(["initial_tag", tag])
        # print("< " + tag + " >")

    def handle_endtag(self, tag):
        self.page_tokens.append(["terminal_tag", tag])
        # print("</" + tag + " >")

    def handle_data(self, data):
        data = data.strip().lower()
        if data:
            self.page_tokens.append(["data", data])
        # print(data)

    def clear_page_tokens(self):
        self.page_tokens = []

def read_html_code(path_html_file):

    with open(path_html_file) as html_doc:
	    html_page = html_doc.read()

    return html_page

def get_iterator_string(iterator):
    
    str_iter = "( "

    for token in iterator:
        if token[0] == "initial_tag":
            str_iter += "".join(["<", token[1],">"])
        elif token[0] == "terminal_tag":
            str_iter += "".join(["</", token[1],">"]) 
        elif token[0] == "optional":
            str_iter += token[1]+""
        else:
            str_iter += token[1]
    
    str_iter += " )+\n"

    return str_iter


def get_optional_string(optional):
    
    str_opt = "( "

    for token in optional:
        if token[0] == "initial_tag":
            str_opt += "".join(["<", token[1],">"])
        elif token[0] == "terminal_tag":
            str_opt += "".join(["</", token[1],">"]) 
        elif token[0] == "optional":
            str_opt += token[1]+""
        else:
            str_opt += token[1]
    
    str_opt += " )?\n"

    return str_opt

def write_final_wrapper_as_ufre(wrapper):
    
    ufre = ""

    for token in wrapper:
        if token[0] == "initial_tag":
            ufre += "".join(["<", token[1],">\n"])
        elif token[0] == "terminal_tag":
            ufre += "".join(["</", token[1],">\n"]) 
        elif token[0] == "optional":
            ufre += token[1]+"\n"
        elif token[0] == "iterator":
            ufre += get_iterator_string(token[1])
        else:
            ufre += token[1]+"\n"

    return ufre


def matching_tokens(token_1, token_2):

    if token_1[0] == token_2[0] and token_1[1] == token_2[1]:
        return True
    elif token_1[0] == "optional" and  token_1[1][1:-2] == token_2[1]:
        print("OPTIONAL MATCHING - MIGHT REQUIRE ADDITIONAL ATTENTION")
        return True

    return False

def find_iterator_end(tokens, start_indx):

    end_tag_found = False
    i = start_indx

    while i < len(tokens):

        if tokens[i][0] == "terminal_tag" and tokens[i][1] == tokens[start_indx][1]:
            end_tag_found = True
            break
        
        i += 1
    
    return end_tag_found, i

def find_prev_iterator_start(tokens, start_indx):

    start_tag_found = False
    i = start_indx

    while i > 0:

        if tokens[i][0] == "initial_tag" and tokens[i][1] == tokens[start_indx][1]:
            start_tag_found = True
            break
        
        i -= 1
    
    return start_tag_found, i

def find_end_of_optional(tokens, start_indx, tag):

    i = start_indx
    found = False

    while i < len(tokens)-1:

        if tokens[i][0] == "terminal_tag" and tokens[i][1] == tag:
            found = True
            break
        
        i += 1
    
    return found, i


def clean_wrapper_iterators(wrapper, iterator_tag, internal_wrapper):

    i = len(wrapper)-1

    new_end = None

    while i > 0:
    
        while i > 0 and wrapper[i][0] == "optional":
            i -= 1

        if wrapper[i][0] == "terminal_tag" and wrapper[i][1] == iterator_tag:
            
            while i > 0:

                if wrapper[i][0] == "initial_tag" and wrapper[i][1] == iterator_tag:
                    new_end = i
                    i -= 1
                    break
                i -= 1
        else:
            break

    if new_end is None:
        return wrapper

    # we found new wrapper
    wrapper = wrapper[:new_end]
    new_iterator = ["iterator", internal_wrapper]
    wrapper.append(new_iterator)

    return wrapper

def roadrunner(wrapper_tokens, sample_tokens, indx_w, indx_s, wrapper):

    
    if indx_w == len(wrapper_tokens) and indx_s == len(sample_tokens):
        # successful matching
        return wrapper

    wrap_token = wrapper_tokens[indx_w]
    smpl_token = sample_tokens[indx_s]

    # IF MATCHING TOKENS, SIMPLY APPEND TO THE WRAPPER
    if matching_tokens(wrap_token, smpl_token):
        wrapper.append(wrap_token)
        return roadrunner(wrapper_tokens, sample_tokens, indx_w+1, indx_s+1, wrapper)
    else:
        # handle string mismatch:
        if wrap_token[0] == "data" and smpl_token[0] == "data":
            wrapper.append(["data", "#PCDATA"])
            return roadrunner(wrapper_tokens, sample_tokens, indx_w+1, indx_s+1, wrapper)
        # tag mismatch - either an optional or an iterative
        else:
            iterative = True
            
            # check for iterative
            prev_wrap_token = wrapper_tokens[indx_w-1]
            prev_smpl_token = sample_tokens[indx_s-1]
            
            
            # iterator discovered on wrapper side
            if prev_wrap_token[0] == "terminal_tag" and wrap_token[0] == "initial_tag" and  prev_wrap_token[1] == wrap_token[1]:
                # confirm existance of equal terminal tag
                iter_found, iter_end_indx = find_iterator_end(wrapper_tokens, indx_w)
                
                if iter_found:

                    prev_iter_found, prev_iter_start_indx = find_prev_iterator_start(wrapper_tokens, indx_w-1)
                    
                    if prev_iter_found:
                        
                        prev_square = wrapper_tokens[prev_iter_start_indx:indx_w]
                        square = wrapper_tokens[indx_w:iter_end_indx+1]

                        internal_wrapper = roadrunner(prev_square, square, 0, 0, [])

                        if internal_wrapper is not None:
                            new_wrapper = clean_wrapper_iterators(wrapper, wrap_token[1], internal_wrapper)
                            return roadrunner(wrapper_tokens, sample_tokens, indx_w, iter_end_indx+1, new_wrapper)

                        else:
                            iterative = False
                    else:
                        iterative = False
                
                else:
                    iterative = False

            # iterator discovered on sample side
            elif prev_smpl_token[0] == "terminal_tag" and smpl_token[0] == "initial_tag" and  prev_smpl_token[1] == smpl_token[1]:
                # confirm existance of equal terminal tag
                iter_found, iter_end_indx = find_iterator_end(sample_tokens, indx_s)
                
                if iter_found:

                    prev_iter_found, prev_iter_start_indx = find_prev_iterator_start(sample_tokens, indx_s-1)
                    
                    if prev_iter_found:
                        
                        prev_square = sample_tokens[prev_iter_start_indx:indx_s]
                        square = sample_tokens[indx_s:iter_end_indx+1]

                        internal_wrapper = roadrunner(prev_square, square, 0, 0, [])

                        if internal_wrapper is not None:
                            wrapper = clean_wrapper_iterators(wrapper, smpl_token[1], internal_wrapper)
                            return roadrunner(wrapper_tokens, sample_tokens, indx_w, iter_end_indx+1, wrapper)

                        else:
                            iterative = False
                            
                    else:
                        iterative = False
                
                else:
                    iterative = False
            else:
                iterative = False


            # check for optional
            if not iterative:
                # option is present on wrapper
                if matching_tokens(wrapper_tokens[indx_w+1], smpl_token):
                    optional = ["optional", " ".join(["(", wrap_token[1],")?"])]
                    wrapper.append(optional)
                    return roadrunner(wrapper_tokens, sample_tokens, indx_w+1, indx_s, wrapper)
               
                elif matching_tokens(wrap_token, sample_tokens[indx_s+1]):
                    optional = ["optional", " ".join(["(", smpl_token[1],")?"])]
                    wrapper.append(optional)
                    return roadrunner(wrapper_tokens, sample_tokens, indx_w, indx_s+1, wrapper)
                else:
                    # print(": >>>> ", wrap_token, " vs ", smpl_token)
                    # print(": >>>> ", wrapper_tokens[indx_w+1], " vs ", smpl_token)
                    # print(": >>>> ", wrap_token, " vs ", sample_tokens[indx_s+1])
                    # print("ERROR MATCHING OPTIONAL !!! ")
                    return None


def main():
    
    """ READ INPUT FILES """
    wrapper_page = read_html_code('../data/test_pages/wrapper_page.html')
    sample_page  = read_html_code('../data/test_pages/sample_page.html')

    """ INITIALIZE PARSERS """
    r_parser = RunnerHTMLParser()

    """ TOKENIZE HTML PAGES """
    r_parser.feed(wrapper_page)
    wrapper_tokens = r_parser.page_tokens
    # for t in wrapper_tokens:
    #     print(t)
    r_parser.clear_page_tokens()

    r_parser.feed(sample_page)
    sample_tokens = r_parser.page_tokens
    # for t in sample_tokens:
    #     print(t)

    """ RUN ROADRUNNER """
    wrapper = roadrunner(wrapper_tokens, sample_tokens, 0, 0, [])

    ufre = write_final_wrapper_as_ufre(wrapper)
    print(ufre)

if __name__ == "__main__":
    main()