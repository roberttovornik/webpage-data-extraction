from pathlib import Path
import os
from lxml import html #etree
import re
import json
import string


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
        pass
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


for domain in PAGES_DIRS:
    html_list = load_htmls(domain) 
    for html_name,html_raw in html_list.items():
        if 'overstock' in domain.name.lower():
            print(extract_data_overstock(html_raw))
        elif 'rtvslo' in domain.name.lower():
            print(extract_data_rtvslo(html_raw))
                


