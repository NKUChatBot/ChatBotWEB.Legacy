# -*- coding: utf-8 -*-
"""
Created on Sat Aug 18 19:38:08 2018

@author: ASUS
"""

from RunQA import RunQA

while True:
    text=input('>>').strip()
    if text=='exit': break
    print('>>'+RunQA.major(text))