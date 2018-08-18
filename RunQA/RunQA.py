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
this_path = os.path.dirname(os.path.realpath(__file__))
name=''
alice = Kernel()
# alice.learn(os.path.join(this_path,"cn-test.aiml")
alice.learn(os.path.join(this_path, '../local_scrap/local_cc.aiml'))
alice.learn(os.path.join(this_path, "../local_scrap/local_cs.aiml"))
alice.learn(os.path.join(this_path, "../local_scrap/who.aiml"))
def major(question) :
    while True:
        name = keywords(question)
        college=find_college(question)
        if len(college)==0:
            return alice.respond("查找老师 "+name)
        else:
            str = ""
            teacher=alice.respond(college[0])
            teacher=teacher.replace("查 找 老 师 ","")
            for i in range(0,len(college)):
                str=str+alice.respond(college[i]+teacher)
                print(str)
            if str=="":
                return "这个人是谁啊，妈妈没告诉我"
            else:
                return str