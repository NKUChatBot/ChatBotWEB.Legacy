#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 15 09:37:32 2018

@author: MacBook
"""
import re


f=open("cs.txt","r")
f0=open("cs0.txt","w")

for str in f:
    str=str.replace("姓 名：      ","姓名：")
    str=str.replace('性 别：      ', '\n'+'性 别：')
    str=str.replace("所属部门：","\n"+"所属部门：")
    if re.search("职务：职 称：",str):
        str=str.replace("行政职务：","")
    else:
        str=str.replace("行政职务：","\n"+"行政职务：")
        
    if re.search("职 称：      学 历：",str):
        str=str.replace("职 称：      ", "\n"+"职 称：未知")
    else:
        str=str.replace("职 称：      ","\n"+"职 称：")
    
    if re.search("学 历：      所学专业：",str):
        str=str.replace("学 历：      ","\n"+"学 历:未知")
    else:
        str=str.replace("学 历：      ","\n"+"学 历:")
        
    if re.search("所学专业：办公电话：",str):
        str=str.replace("所学专业：","\n"+"所学专业：未知")
    else:
        str=str.replace("所学专业：","\n"+"所学专业：")
    if re.search("办公电话：电子邮件：",str):
        str=str.replace("办公电话：","\n"+"办公电话：未知")
    else:
        str=str.replace("办公电话：","\n"+"办公电话：")
    if re.search("电子邮件：研究方向：",str):
        str=str.replace("电子邮件：","\n"+"电子邮件：未知")
    else:
        str=str.replace("电子邮件：","\n"+"电子邮件：")
    
    str=str.replace("研究方向：","\n"+"研究方向：")
    print(str)
    f0.write(str)
f0.close()
f.close()