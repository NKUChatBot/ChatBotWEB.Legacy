import QQChat
print(QQChat.respond(question))

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
# sys.path.append('../local_scrap')
# sys.path.append("../")
from aiml  import Kernel
# import jieba
# from jieba_dic.keyword import keywords
from jieba_dic.keyword import keywords
this_path = os.path.dirname(os.path.realpath(__file__))


def major(question) :
    alice = Kernel()
    # alice.learn(os.path.join(this_path,"cn-test.aiml")
    alice.learn(os.path.join(this_path, '../local_scrap/local_cs.aiml'))
    alice.learn(os.path.join(this_path, "../local_scrap/local_cs.aiml"))

    while True:
        # input_message = input("Enter your message >> ")
        name = keywords(question)
        str = alice.respond(name)
        # print(alice.respond("你好呀"))

        if str == '':
            return "这个人是谁啊，妈妈没告诉我"
        else:
            return str
