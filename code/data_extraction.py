from pathlib import Path
import os
from lxml import html #etree
import re
import json


PAGES_DIR = Path("../data/pages/")
PAGES_DIRS=[PAGES_DIR / 'overstock.com/',
            PAGES_DIR / 'rtvslo.si/',
            PAGES_DIR / 'bolha/']
EXTRACTED_DATA_DIR = Path("../data/extracted_data/")

def load_htmls(html_dir : Path):
    files={}
    for filename in os.listdir(html_dir):
        if filename.endswith('.html'):
            file_path=html_dir / filename
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
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
        regex_listings = '<tr bgcolor=\"#[fd]*\">\s*<td valign="top" align="center">[\s\S]*?<td valign="top">([\s\S]*?)<\/td>\s*<\/tr>\s*<tr>\s*<td colspan="2" height="4">'
        match_listings = re.compile(regex_listings).findall(document)
        listings = [{**listing_template} for l in match_listings]
        for i in range(len(listings)):
            regex_title = '<a href=\".*\">\s*<b>(.*)<\/b><\/a>'
            listings[i]['Title'] = re.compile(regex_title).search(match_listings[i]).group(1)
            regex_prices = '<tbody><tr><td align="right" nowrap="nowrap"><b>List Price:</b></td><td align="left" nowrap="nowrap"><s>(.*)</s></td></tr>\s+<tr><td align="right" nowrap="nowrap"><b>Price:</b></td><td align="left" nowrap="nowrap"><span class="bigred"><b>(.*)</b></span></td></tr>\s+<tr><td align="right" nowrap="nowrap"><b>You Save:</b></td><td align="left" nowrap="nowrap"><span class="littleorange">([^\(]*)\s+\(([^\)]*)\)</span></td></tr>\s+</tbody>'
            match_prices = re.compile(regex_prices).search(match_listings[i])
            listings[i]['ListPrice'] = match_prices.group(1)
            listings[i]['Price'] = match_prices.group(2)
            listings[i]['Saving'] = match_prices.group(3)
            listings[i]['SavingPercent'] = match_prices.group(4) 
            regex_content = '<td valign=\"top\"><span class=\"normal\">([\s\S]*?)<br>'
            match_regex = re.compile(regex_content).search(match_listings[i])
            listings[i]['Content'] = match_regex.group(1)
                   
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
    
    data = json.dumps(listings, ensure_ascii=False)
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
        
        regex_article = '<article class="article">([\s\S]*)</article>'
        match_article = re.compile(regex_article).search(document)
        #print("ARTICLE",match_article.group(1))
        
        regex_articleParagraph = '<p[^>]*?>([\s\S]*?)<\/p>'
        match_articleParagraph = re.compile(regex_articleParagraph).findall(match_article.group(1))        
        article['Content'] = '\n\n'.join([p for p in match_articleParagraph if '<iframe' not in p])
        article['Content'] = article['Content'].replace('<br>','\n')
        article['Content'] = re.sub('<\/?[a-zA-Z]*>',' ',article['Content'])
        
    elif method.lower() == 'xpath':
        tree = html.fromstring(document)
        article["Title"] = tree.xpath('//div[@id="main-container"]/div[3]/div/header/h1')[0].text_content()
        #article['Author'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/div[3]/div[1]/strong')[0].text_content()
        article['Author'] = tree.xpath('//div[@class="author-timestamp"]/strong')[0].text_content()
        article['PublishedTime'] = tree.xpath('//div[@class="author-timestamp"]')[0].text_content().split('|')[1].strip()
        article['SubTitle'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/div[2]/text()')[0]
        article['Lead'] = tree.xpath('//*[@id="main-container"]/div[3]/div/header/p/text()')[0]
        article['Content'] = '\n\n'.join(tree.xpath('//*[@id="main-container"]/div[3]/div/div[2]/article/p/text()'))
    data = json.dumps(article, ensure_ascii=False)
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
        regex_title = '<div class=\"ad\">\s+<h1>(.*)</h1>'
        match_title = re.compile(regex_title).search(document)
        article['Title'] = match_title.group(1)
        regex_category = '\">([\w\-\s]*)<\/a>\s+<\/nav>'
        match_category = re.compile(regex_category).search(document)
        article['Category'] = match_category.group(1)
        regex_price = '<div class=\"price\">Cena: <span>(.*)<\/span><\/div>'
        match_price = re.compile(regex_price).search(document)
        article['Price'] = match_price.group(1)
        regex_id = '<p><label>.*ifra oglasa:<\/label>(.*)<\/p>'
        match_id = re.compile(regex_id).search(document)
        article['ID'] = match_id.group(1)
        regex_timeAdded = '<p><label>Vpisano:<\/label>(.*)<\/p>'
        match_timeAdded = re.compile(regex_timeAdded).search(document)
        article['TimeAdded'] = match_timeAdded.group(1)
        regex_timeChange = '<p><label>Spremenjeno:<\/label>(.*)<\/p>'
        match_timeChange = re.compile(regex_timeChange).search(document)
        article['TimeChange'] = match_timeChange.group(1)
        regex_country_remainingTime = '<p><label>Objavljeno v:<\/label>.*class=\"worldFlags\">(.*)<\/span><\/p>\s+<p class=\"validTo\">Oglas pote.*e .*ez (.*) <\/p>'
        match_country_remainingTime = re.compile(regex_country_remainingTime).search(document)
        article['Country'] = match_country_remainingTime.group(1)
        article['RemainingTime'] = match_country_remainingTime.group(2)
        regex_username = '<p><label>Uporabnik:<\/label><strong>(.*)<\/strong><\/p>'
        match_username = re.compile(regex_username).search(document)
        article['Username'] = match_username.group(1)
        regex_userAddress = '<p><label>Naslov:<\/label><strong>(.*)<br><\/strong><\/p>'
        match_userAddress = re.compile(regex_userAddress).search(document)
        article['UserAddress'] = match_userAddress.group(1)
        
        regex_userPhone = '<p><label>Telefon:<\/label><strong>(.*)<\/strong><\/p>'
        match_userPhone = re.compile(regex_userPhone).search(document)
        if match_userPhone is not None:    
            article['UserPhone'] = match_userPhone.group(1)
        regex_userMobile = '<p><label>Mobilna .*tevilka:<\/label><strong>(.*)<\/strong><\/p>'
        match_userMobile = re.compile(regex_userMobile).search(document)
        if match_userMobile is not None:
            article['UserMobile'] = match_userMobile.group(1)
        regex_userSinceTime = '<i>Uporabnik .*e od (.*)<\/i>'
        match_userSinceTime = re.compile(regex_userSinceTime).search(document)
        article['UserSinceTime'] = match_userSinceTime.group(1)
        regex_description = '<div class=\"content\">\s+<p>([\s\S]*)<\/p>\s+<\/div>\s+<\/div>\s+<div class=\"infoBox\">'
        match_description = re.compile(regex_description).search(document)
        if match_description is not None:
            article['Description'] = match_description.group(1).replace('<br>','\n')
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
        
    data = json.dumps(article, ensure_ascii=False)
    return data
        
        

for domain in PAGES_DIRS:    
    html_list = load_htmls(domain) 
    for html_name,html_raw in html_list.items():
        json_content = None
        if 'overstock' in domain.name.lower():
            json_content = extract_data_overstock(html_raw, method='regex')
        elif 'rtvslo' in domain.name.lower():
            json_content = extract_data_rtvslo(html_raw, method='regex')
        elif 'bolha' in domain.name.lower():
            json_content = extract_data_bolha(html_raw, method='xpath')
       
        json_file_name = html_name +'.json'
        json_file_path = EXTRACTED_DATA_DIR / json_file_name
        with open(json_file_path,'w') as fout:
            fout.write(json_content)
        print(json_content)    
            
            
            
                


