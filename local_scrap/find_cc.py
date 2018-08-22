#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: MacBook
"""
from selenium import webdriver
import time

f=open("cc.txt","a")

driver = webdriver.Chrome()

driver.get('http://cs.nankai.edu.cn/index.php/zh/2017-01-15-22-19-36/2017-01-15-22-20-52?start=10')
ess=driver.find_elements_by_class_name("listinfo")
length=len(ess)
for i in range(0,length):
    ess=driver.find_elements_by_class_name("listinfo")
    es=ess[i]
    link=es.find_elements_by_tag_name("a")[1]
    name=link.text
    #for e in es:
     #   link=e.find_elements_by_tag_name("a")
    #link=links[i]
    
    url=link.get_attribute("href")
    link.click()
            
    basic=driver.find_elements_by_class_name("listinfo")
    print(name)
    f.write("姓名："+name+'\n')
    for i in basic:
        print(i.text)
        f.write(i.text)
    print('\n' * 3)
    f.write('\n' * 3)
    print("想了解更多："+url)
    f.write("想了解更多："+url+'\n')
        
    driver.back()
        #time.sleep(10)
time.sleep(3)
    
#driver.refresh()


driver.quit()
f.close()