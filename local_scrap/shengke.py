#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 15 08:11:19 2018

@author: MacBook
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

f=open("shengke.txt","a")

driver = webdriver.Chrome()
driver.get("http://sky.nankai.edu.cn/list.asp?id=60&PageNo=1")
    
#links=driver.find_elements_by_css_selector("tbody>tr>td.gray14>a")
#length=len(links)
#for j in range(0,length):
#    links=driver.find_elements_by_css_selector("tbody>tr>td.gray14>a")
#    link=links[j]
#    url=link.get_attribute("href")
#    name=link.text
#    link.click()
#    print(name)
#    time.sleep(3)
#    
#    ts=driver.find_elements_by_css_selector("table.MsoTableGrid>tbody")[0].find_elements_by_css_selector("tr>td")
#    print("姓名："+name)
#    f.write("姓名："+name+"/n")
#    for t in ts:
#        print(t.text)
#        f.write(t.text)
#    f.write('\n' * 3)
#    print("想了解更多："+url)
#    f.write("想了解更多："+url+'\n')
#    time.sleep(3)
#    
#    
#    
#    
#    driver.back()
#    
#    
#    
#es=driver.find_elements_by_css_selector("div.page_nav>a")   
#es[-1].click()
#driver.refresh()


i=0
while True:
    es=driver.find_elements_by_css_selector("div.page_nav>a")
    links=driver.find_elements_by_css_selector("tbody>tr>td.gray14>a")
    length=len(links)
    for j in range(0,length):
        links=driver.find_elements_by_css_selector("tbody>tr>td.gray14>a")
        link=links[j]
        url=link.get_attribute("href")
        name=link.text
        link.click()
        
        ts=driver.find_elements_by_css_selector("table.MsoTableGrid>tbody")[0].find_elements_by_css_selector("tr>td")
        print("姓名："+name)
        
        f.write("姓名："+name+"\n")
        for t in ts:
            print(t.text)
            f.write(t.text)
        f.write('\n' * 3)
        print("想了解更多："+url)
        f.write("想了解更多："+url+'\n')
        time.sleep(3)
        
        
        
        driver.back()
        
    es=driver.find_elements_by_css_selector("div.page_nav>a")
    if es[-1].get_attribute("href")==es[-2].get_attribute("href"):
        i+=1
    if i==2:
        break
    
    
    es[-1].click()

    
driver.close()
f.close()
