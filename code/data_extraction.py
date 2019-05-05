from pathlib import Path
import os
from lxml import html #etree
import re
import json
import string


PAGES_DIR = Path("../data/pages/")
PAGES_DIRS=[PAGES_DIR / 'overstock.com/',
            PAGES_DIR / 'rtvslo.si/',
            PAGES_DIR / 'bolha/']

def load_htmls(html_dir : Path):
    files={}
    for filename in os.listdir(html_dir):
        #print(filename.encode('utf-8').strip())
        if filename.endswith('.html'):
            file_path=html_dir / filename
            with open(html_dir / filename, 'r', encoding='ascii', errors='ignore') as file:
                files[filename] = file.read()            
    return files

def extract_data_overstock(document : str, method='xpath'):
    listing_template={'Title' : None,
          'Content' : None,
          'ListPrice' : None,
          'Price' : None,
          'Saving' : None,
          'SavingPercent' : None}
    listings=[]
    #For every listing on webpage fill-out listing_template dictionary
    #and add to listings
    if method == 'regex':
        pass
    elif method == 'xpath':
        tree = html.fromstring(document)
        listing_trees = tree.xpath('/html/body/table[2]/tbody/tr[1]/td[5]/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[@bgcolor]')
        delete_indices = [i for i in range(1,len(listing_trees)) if listing_trees[i].get('bgcolor') == listing_trees[i-1].get('bgcolor')]
        for i in sorted(delete_indices, reverse=True):
            del listing_trees[i]
        listings = [{**listing_template} for l in listing_trees]
        for i in range(len(listings)):
            listings[i]['Title'] = listing_trees[i].xpath('./td[2]/a')[0].text_content()
            listings[i]['ListPrice'] = listing_trees[i].xpath('./td[2]/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]')[0].text_content()
            listings[i]['Price'] = listing_trees[i].xpath('./td[2]/table/tbody/tr/td[1]/table/tbody/tr[2]/td[2]')[0].text_content()
            saving = listing_trees[i].xpath('./td[2]/table/tbody/tr/td[1]/table/tbody/tr[3]/td[2]')[0].text_content()
            saving = saving.split()
            listings[i]['Saving'] = saving[0]
            listings[i]['SavingPercent'] = saving[1][1:-1]
            #listings[i]['Content'] = listing_trees[i].xpath('./td[2]/table/tbody/tr/td[2]/span/text()')[0]
            listings[i]['Content'] = listing_trees[i].xpath('./td[2]/table/tbody/tr/td[2]')[0].text_content()
    
    data = json.dumps(listings)
    return data

def extract_data_rtvslo(document : str, method='xpath'):
    article={"Author" : None,
             "PublishedTime" : None,
             "Title" : None,
             "SubTitle" : None,
             "Lead" : None,
             "Content" : None}
    #Extract required data (using chosen method) and fill-out article dictionary
    if method.lower() == 'regex':
        regex_title_subtitle = '<h1>(.*)</h1>\s+<div class=\"subtitle\">(.*)<\/div>'
        match_title_subtitle = re.compile(regex_title_subtitle).search(document)
        article["Title"] = match_title_subtitle.group(1)
        article["SubTitle"] = match_title_subtitle.group(2)
        regex_author_publishedTime = '<div class=\"author-timestamp\">\s+<strong>(.*)<\/strong>\|\s+([^\t]*)\s+<\/div>'
        match_author_publishedTime = re.compile(regex_author_publishedTime).search(document)
        article['Author'] = match_author_publishedTime.group(1)
        article['PublishedTime'] = match_author_publishedTime.group(2)
        regex_lead = '<p class=\"lead\">(.*)<\/p>'
        match_lead = re.compile(regex_lead).search(document)
        article['Lead'] = match_lead.group(1)
        #regex_content = '<article class=\"article\">\s+<figure class=\"c-figure-right\">.*<\/figure>\s+<p class=\"Body\">(.*)<\/p><\/article>'
        #match_content = re.compile(regex_content).search(document)
        #article['Content'] = match_content.group(1)
        #print(article['Content'])
        
    elif method.lower() == 'xpath':
        tree = html.fromstring(document)
        article["Title"] = tree.xpath('//div[@id="main-container"]/div[3]/div/header/h1')[0].text_content()
        #article['Author'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/div[3]/div[1]/strong')[0].text_content()
        article['Author'] = tree.xpath('//div[@class="author-timestamp"]/strong')[0].text_content()
        article['PublishedTime'] = tree.xpath('//div[@class="author-timestamp"]')[0].text_content().split('|')[1].strip()
        article['SubTitle'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/div[2]/text()')[0]
        article['Lead'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/p/text()')[0]
        article['Content'] = '\n\n'.join(tree.xpath('//*[@id="main-container"]/div[3]/div/div[2]/article/p/text()'))
    data = json.dumps(article)
    return data

def extract_data_bolha(document : str, method='xpath'):
    article={"Category" : None,
             "Title" : None,
             "Price" : None,
             "ID" : None,
             "TimeAdded" : None,
             "TimeChange" : None,
             "Country" : None,
             "RemainingTime" : None,
             "Username" : None,
             "UserAddress" : None,
             "UserPhone" : None,
             "UserMobile" : None,
             "UserSinceTime" : None,
             "Description" : None
            }
    if method.lower() == 'regex':
        pass
    elif method.lower() == 'xpath':
        tree = html.fromstring(document)
        article['Title'] = tree.xpath('//*[@id="adDetail"]/div[2]/h1')[0].text_content()
        article['Category'] = tree.xpath('//*[@id="breadcrumbs"]/nav/a[last()-1]')[0].text_content()
        #document_info = tree.xpath('//section[@id="adDetail"]/div[@class = "infoBox"]/div[@class="documentInfo"]')[0]
        document_info_paragraphs = tree.xpath('//div[@class = "infoBox"]/div[@class="documentInfo"]/p')
        article['ID'] = document_info_paragraphs[0].xpath('./text()')[0]
        article['TimeAdded'] = document_info_paragraphs[1].xpath('./text()')[0]
        article['TimeChange'] = document_info_paragraphs[2].xpath('./text()')[0]
        if len(document_info_paragraphs)>4:
            article['Country'] = document_info_paragraphs[3].xpath('./span/text()')[0]
        article['RemainingTime'] = ' '.join(document_info_paragraphs[-1].xpath('./text()')[0].split()[-2:])
        article['Price'] = tree.xpath('//*[@id="adDetail"]/div[2]/div[1]/span/text()')[0]
        seller_info = tree.xpath('//div[@id="sellerInfo"]/div[@class="box"]')[0]
        article['Username'] = seller_info.xpath('./p/label[text() = "Uporabnik:"]/../strong/text()')[0]
        article['UserAddress'] = seller_info.xpath('./p/label[text() = "Naslov:"]/../strong/text()')[0]
        userPhone = seller_info.xpath('./p/label[text() = "Telefon:"]/../strong/text()')
        if len(userPhone) > 0:
            article['UserPhone']=userPhone[0]
        userMobile = seller_info.xpath('./p/label[text() = "Mobilna številka:"]/../strong/text()')
        if len(userMobile) > 0:
            article['UserMobile'] = userMobile[0]
        article['UserSinceTime'] = seller_info.xpath('./i/text()')[0].split()[-1]   
        article['Content'] = tree.xpath('//div[@class = "content"]/p')[0].text_content()
        
    data = json.dumps(article)
    return data
        
        

for domain in PAGES_DIRS:    
    html_list = load_htmls(domain) 
    for html_name,html_raw in html_list.items():
        if 'overstock' in domain.name.lower():
            print(extract_data_overstock(html_raw, method='regex'))
        elif 'rtvslo' in domain.name.lower():
            print(extract_data_rtvslo(html_raw, method='regex'))
        elif 'bolha' in domain.name.lower():
            print(extract_data_bolha(html_raw, method='xpath'))
                


