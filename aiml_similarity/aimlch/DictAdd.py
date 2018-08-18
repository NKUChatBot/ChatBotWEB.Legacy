# -*- coding: utf-8 -*-
"""
Created on Wed Aug  1 18:10:56 2018

@author: ASUS
"""

def getname(path):
    with open(path,'r',encoding='utf-8-sig')as f:
        lines=f.readlines()
        for line in lines:
            text=line.strip().split()
            if len(text)==2:
                yield text[0]

def addname(names,path):
    with open(path,'a+',encoding='utf-8-sig')as w:
        text='\n'
        for name in names:
            text+='%s 10 nz\n'%name
        w.write(text)

if __name__=='__main__':
    path1=r"C:\Users\ASUS\Desktop\python\NKU_Information\QA\Num.txt"
    path2=r"C:\Users\ASUS\Desktop\python\NKU_Information\QA\What.txt"
    Dictpath=r"C:\Users\ASUS\Desktop\python\NKU_Information\aiml\nk_dict.txt"
    addname(getname(path1),Dictpath)
    addname(getname(path2),Dictpath)