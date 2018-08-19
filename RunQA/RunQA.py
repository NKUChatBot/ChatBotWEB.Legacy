#
#
# def major(question):
#     if question == '':
#         return "greeting!"
#     elif question.lower() == "hello":
#         return "World!"
#     else:
#         return "Opps I can't hear what your words?"
# -*- coding: utf-8 -*-

import os
import sys

from aiml  import Kernel
from jieba_dic.keyword import keywords
from find_college.findKey import find_college
import QQChat
import aiml_similarity as a2s
this_path = os.path.dirname(os.path.realpath(__file__))
name=''
alice = Kernel()
# alice.learn(os.path.join(this_path,"cn-test.aiml")
alice.learn(os.path.join(this_path, '../local_scrap/local_cc.aiml'))
alice.learn(os.path.join(this_path, "../local_scrap/local_cs.aiml"))
alice.learn(os.path.join(this_path, "../local_scrap/who.aiml"))
alice.learn(os.path.join(this_path, "../local_scrap/nk.aiml"))

def similar_ans(question):
    # aiml_similarity模块判定,本模块可信度较高
    answer, similar = a2s.respond(question)  # answer为返回结果，similar记录相似度
    if answer and similar >= 0.45:
        print(answer)
        return answer

    # QQChat模块判定，本模块可信度较低，建议延后
    answer, similar = QQChat.respond(question)  # answer为返回结果，similar记录相似度
    if answer and similar >= 0.4:
        print(answer)
        return answer

    return "妈妈还没有教我"

def major(question) :
    ans=alice.respond(question)
    if ans:
        return ans
    name = keywords(question)
    college=find_college(question)
    if not name and len(college)==0:
        ans = similar_ans(question)
        if ans:
            return ans
    if len(college)==0:
        return alice.respond("查找老师 "+name)
    else:
        str = ""
        if not name:
            teacher=alice.respond(college[0])
            print(college[0])
            print(teacher)
            teacher=teacher.replace("查 找 老 师 ","")
        else:
            teacher=name
        for i in range(0,len(college)):
            str=str+alice.respond(college[i]+teacher)
            # print(str)
        if str.strip():
            return str


