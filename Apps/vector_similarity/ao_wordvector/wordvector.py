# -*- coding: utf-8 -*-
# @Time    : 2018/10/5 9:20
# @Author  : AllenOris
# @Email   : lighthouse0@163.com
# @File    : wordvector.py
# @Software: PyCharm

import pickle


class WordVector:
    def __init__(self, word_map=None):
        """传入一个map"""
        self.word_map = word_map
        self.vector = []
        self._get_vector()
        self.id = []
        self._get_id()

    def _get_vector(self):
        if not self.word_map:
            return None
        for key, value in self.word_map.items():
            self.vector.append(value)

    def _get_id(self):
        if not self.word_map:
            return None
        for key, value in self.word_map.items():
            self.id.append(key)

    def get_id_word(self, num):
        if 0 <= num < len(self.id):
            return self.id[num]
        return None

    def get_vector(self):
        return self.vector

    def get_id_vector(self, num):
        if 0 <= num < len(self.id):
            return self.vector[num]

    def get_word_vector(self, word):
        if word in self.word_map:
            return self.word_map[word]
        return None

    def save(self, filename):
        with open(filename, 'wb')as w:
            pickle.dump(self, w)


def load_word_vector(pkl_name):
    with open(pkl_name, 'rb')as f:
        return pickle.load(f)


if __name__ == '__main__':
    mp = {'a': [0], 'd': [1], 'c': [2], '好': [1, 2], '人': [2, 3]}
    WV = WordVector(word_map=mp)
    print(WV.get_id_vector(0))
    print(WV.get_vector())
    print(WV.get_word_vector('a'))