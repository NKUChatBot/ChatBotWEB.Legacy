import jieba.analyse
from jieba import analyse

# 引入TF-IDF关键词抽取接口


#import jieba.posseg as pseg

import os

this_path = os.path.dirname(os.path.realpath(__file__))

jieba.load_userdict(os.path.join(this_path, '../scrap/name.txt'))
jieba.load_userdict(os.path.join(this_path, '../scrap/college.txt'))
# 使用自定义停用词集合
analyse.set_stop_words(os.path.join(this_path, "../scrap/stopword.txt"))



def keywords(content):
	#tags = jieba.analyse.extract_tags(content, topK=2, wisthWeight=withWeight, allowPOS=())     # topK 为高频词数量
	#print("\n".join(tags))
    tags = jieba.analyse.extract_tags(content, topK=2, withWeight = True, allowPOS=('nr',))
    for tag in tags:
        print("%s\t\t weight: %f" % (tag[0],tag[1]))

        return tag[0]    
    
    #words = pseg.cut(content) #词性分析
    #for word, flag in words:
     #   print('%s %s' % (word, flag))

if __name__=="__main__":
    keywords("南开大学计控学院张建磊老师")
    print(this_path)
    
