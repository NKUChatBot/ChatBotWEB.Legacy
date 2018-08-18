#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 22:07:49 2018

@author: MacBook
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
f=open("cs.txt","a")
driver = webdriver.Chrome()
url='https://cc.nankai.edu.cn/frontend/teachers/'
str=['Search.aspx?type=13','Search.aspx?type=14','Search.aspx?type=15','Search.aspx?type=16','PostDoctor.aspx','AdjunctProfessor.aspx']
j=0
while(j<len(str)):
    
    driver.get('https://cc.nankai.edu.cn/frontend/teachers/'+str[j])

    es=driver.find_elements_by_css_selector("tr>td>a")
    length=len(es)
    for i in range(0,length):
        links=driver.find_elements_by_css_selector("tr>td>a")
        link=links[i]
        url=link.get_attribute("href")
        link.click()
        
        basic=driver.find_elements_by_css_selector("div.col-md-7>p>span")
        for i in basic:
            print(i.text,end='  ')
            f.write(i.text)
        print('\n' * 3)
        f.write('\n' * 3)
        print("想了解更多："+url)
        f.write("想了解更多："+url+'\n')
        time.sleep(3)
        
        driver.back()
        #time.sleep(10)
    j+=1
    time.sleep(3)
    
#driver.refresh()


driver.quit()
f.close()