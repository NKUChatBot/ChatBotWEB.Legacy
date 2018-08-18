#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: MacBook
"""
import re
f0=open("../scrap/name.txt","a")
f= open("cs0.txt","r")
for line in f :
    if re.search("姓名",line):
        str=re.findall(r"姓名：(.*)",line)
        print(str[0])
        f0.write(str[0]+" nr"+"\n")
        
f0.close()
f.close()
