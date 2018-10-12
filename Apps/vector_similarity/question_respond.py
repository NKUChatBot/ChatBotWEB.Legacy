# -*- coding: utf-8 -*-
"""
Created on Wed Aug  1 11:14:04 2018

@author: Allen
"""

import os
import sys
abs_path = os.path.split(os.path.realpath(__file__))[0] + '/'
if abs_path not in sys.path:
    sys.path.append(abs_path)

from .aimlch import _Kernel
from . import ao_readfile_word
from . import ao_wordvector
from . import kd_tree

# from aimlch import _Kernel
# import ao_readfile_word
# import ao_wordvector
# import kd_tree

from lxml import etree
import time
import pickle
import math

Kia = _Kernel.Kernel()
abs_path = os.path.split(os.path.realpath(__file__))[0] + '/'
pkl_path = abs_path + 'pkl/'
pkl_kd_sent = pkl_path + "kd_sent.pkl"
wv_path = abs_path + 'pkl/WV.pkl'
path = abs_path + 'aiml_data/'
questionlist = []


class QAPair:
    def __init__(self, Q=None, A=None, similarity=0):
        self.Q = Q
        self.A = A
        self.sim = similarity


with open(wv_path, 'rb')as f:
    """加载词向量预处理结束的pickle文件"""
    WV = pickle.load(f)


def toquestion(filename):
    """读取aiml文件，存入quesionist"""
    ques = []
    with open(filename, 'rb') as f:
        text = f.read()
        root = etree.fromstring(text)
        for element in root.xpath('//pattern'):
            ques.append(element.text)
    return ques


def normalization_vector(vec):
    """将向量归一化"""
    if not vec:
        return None
    try:
        norm = float(math.sqrt(sum(map(lambda x: x * x, vec))))
        return list(map(lambda x: x / norm, vec))
    except Exception as e:
        print(e, vec)


def normalization_vectors(vectors):
    """向量组归一化"""
    vec = []
    for vector in vectors:
        vec.append(normalization_vector(vector))
    return vec


def sentence_vector(sentences):
    """"传入向量组，计算一个句子向量之和"""
    try:
        s = [sum(sentences[j][i] for j in range(len(sentences))) for i in range(len(sentences[0]))]
        return s
    except Exception as e:
        print(e)
        return None


def to_sentence_vector(raw_sentence):
    """将句子转化为向量，传入字符串"""
    sentence = ao_readfile_word.Sentences().sentences_cut(raw_sentence)
    if not sentence:
        return None
    if __name__=='__main__':
        print(raw_sentence, sentence)
    v = []
    for word in sentence:
        if word in WV.word_map:
            v.append(WV.get_word_vector(word))
        else:
            # print(word,end=' p')
            continue
    return sentence_vector(v)


def to_sentences_vector(sentences):
    """将多个句子转化成向量，传入字符串组"""
    res = []
    for sent in sentences:
        if not to_sentence_vector(sent):
            print(sent)
        res.append(to_sentence_vector(sent))
    return normalization_vectors(res)


def load():
    """预处理，加载"""
    aimllist = os.listdir(path)
    if not aimllist:
        return
    for aimlfile in aimllist:
        if 'aiml' in aimlfile:
            filename = path + aimlfile
            Kia.learn(filename)
            questionlist.extend(toquestion(filename))
    flag = False
    pkl_sent = pkl_path + "senteces_kdtree.pkl"
    if flag or not os.path.exists(pkl_kd_sent):
        questions_vector = to_sentences_vector(questionlist)
        kdt = kd_tree.KDTree(questions_vector)
        with open(pkl_kd_sent, 'wb')as w:
            pickle.dump(kdt, w)


load()
with open(pkl_kd_sent, 'rb')as f:
    kdt = pickle.load(f)


def cos_dis(x, y):
    """计算余弦距离"""
    norm_x = float(sum(map(lambda a: a * a, x)))
    norm_y = float(sum(map(lambda a: a * a, y)))
    D = 0
    for i in range(len(x)):
        D += x[i] * y[i]
    return D / math.sqrt(norm_x) / math.sqrt(norm_y)


def find_similarity(text, topn=1):
    vector = normalization_vector(to_sentence_vector(text))
    nearest = kdt.query_kd(vec=vector, topn=topn)
    if not nearest:
        return None
    if __name__ == '__main__':
        for p in nearest:
            print(questionlist[p.num], cos_dis(vector, p.x))
    ans = []
    for ele in nearest:
        ans.append(QAPair(Q=questionlist[ele.num], similarity=cos_dis(vector, ele.x)))
    return ans



def respond(question, topn=1):
    """返回一个QApair，含topn对，包含问题，答案与相似度，相似度从大至小"""
    ans = Kia.respond(question)
    if ans.strip():
        return ans, 1.0
    ans = find_similarity(question, topn)
    if not ans:
        return None
    if __name__ == '__main__':
        print('相似答案：' + ans[0].Q, '相似度:', ans[0].sim)
    for ele in ans:
        ele.A = Kia.respond(ele.Q)
    return ans


def main():
    print('\n\n--aiml_similarity模块加载中--\n')
    start = time.time()
    load()
    respond('南开大学')
    end = time.time()
    print('\n\n--aiml_similarity模块加载完毕--\n--加载时间:%fs--\n\n' % (end - start))


if __name__ == '__main__':
    while (1):
        text = input(">>").strip()
        if (text == 'exit'):
            print(">>再见")
            break
        answers = respond(text)
        if answers:
            answer = answers[0].Q.strip()
            if answer:
                print(answer, answers[0].sim)
            else:
                pass
