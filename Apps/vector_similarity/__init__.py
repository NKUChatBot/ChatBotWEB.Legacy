# -*- coding: utf-8 -*-
"""
Created on Sat Aug 11 18:36:14 2018

@author: ASUS
"""

from . import question_respond

def respond(question,topn=1):
    """返回多个QAPair组，包含Q:问题,A:答案,sim:相似度"""
    ans = question_respond.respond(question,topn)
    return ans
