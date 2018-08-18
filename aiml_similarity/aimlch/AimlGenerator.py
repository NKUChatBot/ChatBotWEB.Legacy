# -*- coding: utf-8 -*-

def addQA(Q=None,A=None):
    if not Q:
        return "<category>\n"
    else:
        return "<category>\n"+addQ(Q)+addA(A)+endQA()

def endQA():
    return "</category>\n\n"

def addQ(text):
    """
    pattern
    """ 
    table=1
    return '\t'*table+"<pattern>"+text+"</pattern>\n" 
    
def addA(text):
    table=1
    return '\t'*table+"<template>"+text+"</template>\n" 


def addtitle():
    """
    开头
    """
    text='<?xml version="1.0" encoding="UTF-8"?>\n<aiml version="1.0">\n\n'
    return text

def endtitle():
    """
    结束
    """
    return "\n</aiml>"


if __name__=='__main__':
    text=''
    text+=addtitle()
    text+=addQA()
    text+=addQ("你好")
    text+=addA("好")
    text+=endQA()
    text+=addQA('a','b')
    text+=endtitle()
    print(text)
    pass