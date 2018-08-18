# -*- coding: utf-8 -*-
"""
Created on Sat Aug 11 18:36:14 2018

@author: ASUS
"""

from . import aiml_similarity

def respond(question):
    """返回一个答案，与问题所对应的相似度"""
    ans,r=aiml_similarity.respond(question)
    return ans,r