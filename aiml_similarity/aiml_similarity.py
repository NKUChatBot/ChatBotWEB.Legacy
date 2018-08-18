# -*- coding: utf-8 -*-
"""
Created on Wed Aug  1 11:14:04 2018

@author: Allen
"""

from .aimlch import _Kernel
from lxml import etree
#from . import synonyms
from .similars import fenci
import os
import time

Kia=_Kernel.Kernel()
abs_path=abs_path = os.path.split(os.path.realpath(__file__))[0]+'/'
path=abs_path+'data/'
questionlist=[]

def toquestion(filename):
    ques=[]
    with open(filename,'rb') as f:
        text=f.read()
        root=etree.fromstring(text)
        for element in root.xpath('//pattern'):
            ques.append(element.text)
    return ques

def load():
    aimllist=os.listdir(path)
    if not aimllist:
        return
    for aimlfile in aimllist:
        if 'aiml' in aimlfile:
            filename=path+aimlfile
            Kia.learn(filename)
            questionlist.extend(toquestion(filename))
            
def find_similarity(text):
    dis=0.35
    nearest_question=''
    for sent in questionlist:
        try:
            r=fenci.similarity(sent,text)
            #r=synonyms.compare(sent,text,seg=True,ignore=True)
            if r>dis:
                dis=r
                nearest_question=sent
        except:
            pass
    return nearest_question,dis
        
def respond(question):
    ans=Kia.respond(question)
    if ans.strip():
        return ans,1.0
    question,r=find_similarity(question)
    print('相似答案：'+question,'相似度:',r)
    return Kia.respond(question).strip(),r

def _respond(question):
    ans=Kia.respond(question)
    if ans.strip():
        return ans,1.0
    question,r=find_similarity(question)
    return Kia.respond(question).strip(),r

def main():
    print('\n\n--aiml_similarity模块加载中--\n')
    start=time.time()
    load()
    _respond('南开大学')
    end=time.time()
    print('\n\n--aiml_similarity模块加载完毕--\n--加载时间:%fs--\n\n'%(end-start))
 
main()   
  
if __name__=='__main__':
    load()
    while(1):
        text=input(">>").strip()
        if(text=='exit'):
            print(">>再见")
            break
        answer,r=respond(text)
        answer=answer.strip()
        if r:
            print(answer,r)
        else:
            pass

         