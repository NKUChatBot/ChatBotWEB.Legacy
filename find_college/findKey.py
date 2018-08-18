#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: chejie
"""
import jieba
import os
this_path = os.path.dirname(os.path.realpath(__file__))

def find_college(sentence):
    jieba.load_userdict(os.path.join(this_path, "../scrap/college.txt"))
    combine_dict = {}
    for line in open(os.path.join(this_path,"../scrap/synonyms.txt"), "r"):
        seperate_word = line.strip().split("\t")
        num = len(seperate_word)
        for i in range(1, num):
            combine_dict[seperate_word[i]] = seperate_word[0]
 
    seg_list = jieba.cut(sentence, cut_all = False)
    f = "/".join(seg_list)#.encode("utf-8")  # 删掉后面部分，python 3 才不报错。
    # print (f)
    keyword=list()
    final_sentence = ""
    for word in f.split("/"):
        if word in combine_dict:
            word = combine_dict[word]
            final_sentence += word
            keyword.append(word)
        else:
            final_sentence += word
    print (final_sentence)
    print(keyword)
    if len(keyword)==0:
        print("学院未知")
    return keyword

if __name__=="__main__":
    find_college("计算机或者软件学院的吧")
    str=find_college("张建磊老师")


