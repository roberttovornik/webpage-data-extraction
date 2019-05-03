from pathlib import Path
import os
import json


PAGES_DIR = Path("../data/pages/")
PAGES_DIRS=[PAGES_DIR / 'overstock.com/',
            PAGES_DIR / 'rtvslo.si/']

def load_htmls(html_dir : Path):
    files={}
    for filename in os.listdir(html_dir):
        #print(filename.encode('utf-8').strip())
        if filename.endswith('.html'):
            file_path=html_dir / filename
            with open(html_dir / filename, 'r', encoding="iso-8859-1") as file:
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
        pass
    
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
    if method == 'regex':
        pass
    elif method == 'xpath':
        pass
    
    data = json.dumps(article)
    return data


for domain in PAGES_DIRS:
    html_list = load_htmls(domain) 
    for html in html_list:
        if 'overstock' in domain.name.lower():
            print(extract_data_overstock(html))
        elif 'rtvslo' in domain.name.lower():
            print(extract_data_rtvslo(html))
                

