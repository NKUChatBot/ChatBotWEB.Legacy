# -*- coding: utf-8 -*-
"""
静态KD树
@author:    Allen Oris
"""
import copy
import queue
import multiprocessing
import time


class Node:
    def __init__(self, axes=None, num=0):
        self.x = copy.deepcopy(axes)
        self.num = num

    def axes_in(self, axes):
        if self.x:
            self.x.clear()
        self.x = copy.deepcopy(axes)


class DAN:
    def __init__(self, dis=0.0, num=0):
        """记录距离，与点下标"""
        self.dis = dis
        self.num = num

    def __cmp__(self, other):
        return -1 if self.dis > other.dis else 1 if self.dis < other.dis else 0

    def __lt__(self, other):
        return self.dis > other.dis


class FakeQueue:
    def __init__(self):
        self.elements = []

    def put(self, element):
        self.elements.append(element)

    def get(self):
        ele = min(self.elements)
        self.elements.remove(ele)
        return ele

    def empty(self):
        return len(self.elements) == 0

    def size(self):
        return len(self.elements)


class KDTree:
    def __init__(self, nodes):
        """传入向量矩阵即可"""
        # 进程池处理
        # self.pool = multiprocessing.Pool()
        # M = multiprocessing.Manager()
        # self.que = queue.PriorityQueue() 失败
        self.que = FakeQueue()
        self.N = len(nodes)  # 静态点数
        self.node = [Node(nod, j) for j, nod in enumerate(nodes)]
        self.K = self.tree_dimension()
        self.sz = [0 for i in range(self.N << 2)]  # size数组
        self.p = self.open_array()
        self.idx = 0
        self.q_sz = 0
        self.target = Node()
        self.build_kd(1, 0, self.N - 1, 0)

    def build_kd(self, i, l, r, dep):
        """构建kd树，传入树下标(初始为1)，左端点(0)，右端点(N-1)，深度(0)"""
        if l > r:
            return  # 树底结束
        mid = (l + r) >> 1
        lc = i << 1
        rc = i << 1 | 1
        idx = dep % self.K  # 该层维度
        self.sz[i] = r - l
        self.sz[lc] = self.sz[rc] = -1
        # nth_element(node + l, node + mid, node + r + 1) pyhton没有nth_element需要自己写，会比直接sort快，留坑
        self.sort_node(l, r + 1, idx)
        self.p[i] = self.node[mid]
        self.build_kd(lc, l, mid - 1, dep + 1)
        self.build_kd(rc, mid + 1, r, dep + 1)

    def query_kd(self, topn, vec):
        """查询最邻近的topn个点",topn:查询个数，vec:查询向量，结果返回一个列表id"""
        a = vec
        if not a:
            return None
        if len(a) != self.K:
            raise RuntimeError("相似度传入维数错误")
        self.que_clear()
        self.target.axes_in(a)
        self.query(1, topn, 0)
        res = []
        while not self.que.empty():
            res.append(self.que.get())
        ans = []
        for nod in reversed(res):
            ans.append(self.p[nod.num])
        return ans

    def query(self, i, m, dep):
        if self.sz[i] == -1:
            return
        tmp = DAN(0, i)
        lc, rc, idx, flag = i << 1, i << 1 | 1, dep % self.K, False
        for j, xj in enumerate(self.target.x):
            tmp.dis += self.sqr(xj - self.p[i].x[j])
        if self.target.x[idx] >= self.p[i].x[idx]:
            lc, rc = rc, lc
        self.query(lc, m, dep + 1)
        if self.q_sz < m:
            self.que.put(tmp)
            flag = True
            self.q_sz += 1
        else:
            backup = self.que.get()
            if tmp.dis < backup.dis:
                self.que.put(tmp)
                backup = self.que.get()
                self.que.put(backup)
            else:
                self.que.put(backup)
            if self.sqr(self.target.x[idx] - self.p[i].x[idx]) < backup.dis:
                flag = True
        if flag:
            self.query(rc, m, dep + 1)

    def tree_dimension(self):
        if len(self.node) == 0:
            return 0
        k = len(self.node[0].x)
        for nod in self.node:
            if len(nod.x) != k:
                raise RuntimeError("维度失衡!")
        return k

    def open_array(self):
        arr = []
        for i in range(self.N << 2):
            arr.append(Node())
            arr[i].x = [0 for i in range(self.K)]
        return arr

    def sort_node(self, l, r, idx):
        tmp = []
        for i in range(l, r):
            tmp.append(self.node[i])
        tmp.sort(key=lambda x: x.x[idx], reverse=False)
        j = 0
        for i in range(l, r):
            self.node[i] = tmp[j]
            j += 1

    def que_clear(self):
        while not self.que.empty():
            self.que.get()
        self.q_sz = 0

    def sqr(self, x):
        return x * x