#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: MacBook
"""
import re


def findstr(filename):
    f= open(filename,"r")
    pre=""
    for line in f :
        if re.search("姓名",pre):
            str=re.findall(r"(.*): ",line)
            return str[0]
        pre=line

s=findstr("cc.txt")


f=open("local_cc.aiml","w")
f0=open("template.aiml","r")
f1=open("cc.txt","r")
for line in f0:
    print(line)
    f.writelines(line)




for line in f1:
    if re.search("姓名",line):
        f.write("<category>"+"\n")
        str=re.findall(r"姓名：(.*)",line)
        print("<pattern>"+str[0]+"</pattern>")
        f.write("<pattern>"+str[0]+"</pattern>"+"\n")
    else:
        if re.search(s,line):
            print("<template>"+line)
            f.write("<template>"+line)
        elif re.search("想了解更多",line):
            print(line+"</template>")
            f.write(line+"</template>"+"\n")
            f.write("</category>"+"\n")
        else:
            print(line)
            f.write(line)

f.write("</aiml>")
    
f1.close()
f0.close()
f.close()
