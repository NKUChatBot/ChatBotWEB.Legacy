# similarity_new

改进版的相似度判定

对于训练好的word2vec向量做些预处理，句子向量用词语加和的结果表示，归一化后建立向量kd树。

## 函数调用

`respond(question, topn=1)`

question:输入的问题

topn:查找相似的最高的topn个

return:返回一个topn个QAPair，QAPair为一个类，包含Q(匹配的问题)，A(对应的回答)，sim(相似度)

## 使用例子

```python
import vector_similarity as v_sim

question = "南开大学面积多大?"
QAPair = v_sim.respond(question, topn=5)

for i, pair in enumerate(QAPair):
    print("第%d个最近匹配问题:%s 回答:%s 相似度:%f" % (i + 1, pair.Q, pair.A, pair.sim))
```



pkl文件：

* all_words.pkl 所有词库中的词，umpickle后为set


* kdtree.pkl kdtree模块，unpickle后为kdtree，节点存储为词向量


* sentences.pkl 经过处理的训练原语料，unpickle后为二维列表


* more.w2v 训练后的词向量，用gensim读取 

（好吧，上面的因为太占空间而且用不到所以删了）

* kd_sent.pkl 初始化好的kd树模型文件，可删，时间有一定影响
* WV.pkl 最重要的文件，预处理之后的单词向量