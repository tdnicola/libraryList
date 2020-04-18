from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

import os
import time
import re
import pymongo
from pymongo import MongoClient
import json

path_to_json = "./config.json"

with open(path_to_json, "r") as handler:
    info = json.load(handler)

user = info["username"]
password = info["password"]
uri = info["uri"]


def getHooplaLinks(listName):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(
        chrome_options=chrome_options,
        executable_path='/home/tony/repos/chromedriver')
    driver.get("http://www.pueblolibrary.org")

    myAccount = driver.find_element_by_link_text('My Account')
    myAccount.click()

    findUsername = driver.find_element_by_id('username')
    findUsername.send_keys(user)
    findPassword = driver.find_element_by_id('password')
    findPassword.send_keys(password)
    submitButton = driver.find_element_by_id('loginFormSubmit')
    submitButton.click()

    findMyLists = driver.find_element_by_link_text('My Lists')
    findMyLists.click()
    time.sleep(1)

    class bookDetails:
        def __init__(self, title, link, author, image):
            self.title = title
            self.link = link
            self.author = author
            self.image = image

    hooplaInformationArray = []
    # findListTitles = driver.find_elements_by_class_name('result-title')
    try:
        listName = driver.find_element_by_link_text(listName)
        listName.click()
        # hooplaLinks = []
        resultList = driver.find_elements_by_class_name('result')
        hooplaButtons = driver.find_elements_by_link_text('Check Out Hoopla')
        findListTitles = driver.find_elements_by_class_name('result-title')
        imageLinkList = driver.find_elements_by_class_name('listResultImage')
        # authorList = driver.find_elements_by_class_name('result-value', 'col-tn-9', 'col-xs-9', 'notranslate')
        for item in range(len(resultList)):
            try:
                bookAuthorHtml = resultList[item].find_elements_by_class_name(
                    'result-value')[0].get_attribute('innerHTML')
                clean = re.compile('<.*?>')
                bookAuthor = re.sub(clean, '', bookAuthorHtml)
            except:
                bookAuthor = 'Not Found'
            try:
                imageLink = imageLinkList[item].get_attribute('src')
            except:
                imageLink = 'Not Found'
            try:
                bookTitle = findListTitles[item].get_attribute('innerHTML')
            except:
                bookTitle = 'Not Found'
            try:
                hooplaLink = hooplaButtons[item].get_attribute('outerHTML')
                titleNumber = ''.join(i for i in hooplaLink if i.isdigit())
            except:
                titleNumber = '#'
            singleBookInsert = bookDetails(
                bookTitle, 'https://www.hoopladigital.com/title/' + str(titleNumber), bookAuthor, imageLink)
            hooplaInformationArray.append(singleBookInsert)
    except:
        print('no such list found')

    client = pymongo.MongoClient(uri)
    db = client.liveTest
    bookDetails = db.funEbooks
    try:
        for obj in hooplaInformationArray:
            book = {
                'list': listName,
                'title': obj.title,
                'link': obj.link,
                'author': obj.author,
                'image': obj.image
            }
            result = bookDetails.insert_one(book)
            print(result)
    except:
        print('database error')


getHooplaLinks('Fun Ebooks available on Hoopla (16)')
#     print( obj.title, obj.link, sep =' ' )
