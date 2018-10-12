# -*- coding: utf-8 -*-
# @Time    : 2018/10/4 20:20
# @Author  : AllenOris
# @Email   : lighthouse0@163.com
# @File    : ao_readfile_word.py
# @Software: PyCharm

import jieba
import pickle
import os
import re

abs_path = os.path.split(os.path.realpath(__file__))[0] + '/'


class Sentences:
    def __init__(self, file_list=None, jieba_dict=abs_path+"nk_dict.txt", comma=True):
        """"保证file_list是列表,都是有效的且编码为uft-8",comma表示是否分割逗号"""
        if jieba_dict:
            try:
                jieba.load_userdict(jieba_dict)
            except Exception as e:
                print(e, "字典目录不存在\n")

        self.stopwords = set()
        self.sentence_list = []
        self.raw_word_list = []
        self.comma = comma
        self.read_stopwords()
        self.file_list = file_list

    def read_stopwords(self):
        stopword_file = abs_path + "stop_words.pkl"
        if not os.path.exists(stopword_file):
            with open(abs_path + "stop_words.txt", "r", encoding='utf-8')as f:
                lines = f.readlines()
                tmp_list = []
                for line in lines:
                    line = line.strip()
                    if line:
                        tmp_list.append(line)
                self.stopwords = set(self.stopwords)
                with open(stopword_file, 'wb')as w:
                    pickle.dump(self.stopwords, w)

        with open(abs_path + "stop_words.pkl", "rb")as f:
            self.stopwords = pickle.load(f)
            if __name__ == '__main__':
                print("停用词数量=", len(self.stopwords))

    def get_sentences(self, file_list=None):
        if not self.sentence_list:
            self.deal_file(file_list)
        return self.sentence_list

    def sentences_cut(self, sentence):
        new_words = list(jieba.cut(sentence))
        word_list = []
        for word in new_words:
            if word not in self.stopwords and self.check_contain_chinese(word):
                word_list.append(word)
        return word_list

    def read_file(self, f):
        pattern = "。；:：/\"\'\“、”“:(),，" if self.comma else "。；:：/\"\'\“、”“:()"
        line = f.readline()
        while line:
            line = line.strip()
            if line:
                for single_line in line.split():
                    self.sentence_list.extend(self.deal_sentence(re.split(pattern, single_line)))  # line.split('。')))
            line = f.readline()

    def deal_file(self, file_list):
        if not file_list:
            file_list = self.file_list
        if not file_list:
            return
        for file in file_list:
            try:
                with open(file, 'r', encoding='utf-8')as f:
                    self.read_file(f)
            except Exception as e:
                try:
                    with open(file, 'r', encoding='gbk')as f:
                        self.read_file(f)
                except Exception as e:
                    try:
                        with open(file, 'r', encoding='utf-8-sig')as f:
                            self.read_file(f)
                    except Exception as e:
                        try:
                            with open(file, 'r', encoding='gbk2312')as f:
                                self.read_file(f)
                        except Exception as e:
                            print(e, file)

    def deal_sentence(self, sentences):
        sen_list = []
        for sentence in sentences:
            new_words = list(jieba.cut(sentence))
            word_list = []
            for word in new_words:
                if word not in self.stopwords and self.check_contain_chinese(word):
                    self.raw_word_list.append(word)
                    word_list.append(word)
            if word_list:
                sen_list.append(word_list)
        return sen_list

    def get_all_word_set(self):
        """"取得所有存在的词"""
        return set(self.raw_word_list)

    def get_raw_words(self):
        return self.raw_word_list

    def save_sentences_pickle(self, file):
        with open(file, 'wb') as w:
            pickle.dump(self.sentence_list, w)

    def read_sentences_pickle(self, file):
        with open(file, 'rb')as f:
            self.sentence_list = pickle.load(f)

    def check_contain_chinese(self, check_str):
        for ch in check_str:
            if u'\u4e00' <= ch <= u'\u9fff':
                return True
        return False


if __name__ == "__main__":
    print(os.listdir())
    for root, dirs, files in os.walk(abs_path):
        print(root)  # 当前目录路径
        print(dirs)  # 当前路径下所有子目录
        print(files)  # 当前路径下所有非目录子文件
    print(os.path.exists(abs_path + "novel.txt"))
    sen = Sentences(["novel.txt"])
    print(sen.get_sentences())
    print(sen.sentences_cut("南开紫是什么"))
