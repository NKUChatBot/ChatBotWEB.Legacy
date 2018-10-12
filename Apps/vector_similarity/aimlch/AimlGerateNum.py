# -*- coding: utf-8 -*-
"""
Created on Wed Aug  1 17:15:14 2018

@author: Allen
"""

import AimlGenerator as gern

name=r"C:\Users\ASUS\Desktop\python\NKU_Information\QA\Num.txt"
with open(name,'r',encoding='utf-8-sig')as f:
    lines=f.readlines()
    with open(r"C:\Users\ASUS\Desktop\python\NKU_Information\QA\Num.aiml",'w',encoding='utf-8') as w:
        text=gern.addtitle()
        for line in lines:
            qa=line.strip().split()
            if(len(qa)!=2):
                continue
            a=qa[0]
            b=qa[1]
            question="南开大学%s有多少"%(a)
            answer="南开大学%s有%s"%(a,b)
            text+=gern.addQA(question,answer)
        text+=gern.endtitle()
        w.write(text)
                