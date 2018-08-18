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
<<<<<<< HEAD
from aiml  import Kernel
from jieba_dic.keyword import keywords
from find_college.findKey import find_college
=======
sys.path.append('../')
# sys.path.append('../local_scrap')
# sys.path.append("../")

from aiml import Kernel
import QQChat                  #Allen's
import aiml_similarity as a2s  #Allen's

# import jieba
# from jieba_dic.keyword import keywords

from jieba_dic.keyword import keywords

>>>>>>> dev
this_path = os.path.dirname(os.path.realpath(__file__))
name=''
alice = Kernel()
# alice.learn(os.path.join(this_path,"cn-test.aiml")
alice.learn(os.path.join(this_path, '../local_scrap/local_cc.aiml'))
alice.learn(os.path.join(this_path, "../local_scrap/local_cs.aiml"))
alice.learn(os.path.join(this_path, "../local_scrap/who.aiml"))
def major(question) :
<<<<<<< HEAD
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
=======
    alice = Kernel()
    # alice.learn(os.path.join(this_path,"cn-test.aiml")
    alice.learn(os.path.join(this_path, '../local_scrap/local_cs.aiml'))
    alice.learn(os.path.join(this_path, "../local_scrap/local_cs.aiml"))
    
    # input_message = input("Enter your message >> ")
    
    # aiml_similarity模块判定,本模块可信度较高
    answer, similar = a2s.respond(question) #answer为返回结果，similar记录相似度
    if answer and similar>=0.4:
        print(answer)
        return answer
    
    # QQChat模块判定，本模块可信度较低，建议延后
    answer, similar = QQChat.respond(question) #answer为返回结果，similar记录相似度
    if answer and similar>=0.4:
        print(answer)
        return answer
    
    name = keywords(question)
    str = alice.respond(name)
    # print(alice.respond("你好呀"))

    if str == '':
        return "这个人是谁啊，妈妈没告诉我"
    else:
        return str
    

>>>>>>> dev
