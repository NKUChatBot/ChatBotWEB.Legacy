# -*- coding: utf-8 -*-
"""
Created on Sat Aug 18 20:30:29 2018

@author: ASUS
"""
import io
with open(r'C:\Users\ASUS\Desktop\python\QABOT\ChatBotWEB\aiml_similarity\synonyms\data\vocab.txt',encoding='utf-8')as f:
    lines=f.readlines()
    with open(r"C:\Users\ASUS\Desktop\python\QABOT\ChatBotWEB\aiml_similarity\synonyms\data\vocab2.txt",'w',encoding='utf-8')as w:
        for line in lines:
            w.write(line.strip()+'\n')
            print(line.strip())
    pass