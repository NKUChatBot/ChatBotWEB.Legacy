# -*- coding: utf-8 -*-

#import synonyms

import time
import random
from .similars import fenci
#from .word_similarity import WordSimilarity2010
import jieba
import os
#from .textsimilar import sim_cilin
#from .textsimilar import sim_hownet

QA=[]

abs_path=os.path.split(os.path.realpath(__file__))[0]+'/'

stopword=[]
punc={'.',',','?','？',':','。','+','-','，','^','……'}
with open(abs_path+'stopwords.txt','r',encoding='utf-8')as f:
    lines=f.readlines()
    for line in lines:
        stopword.append(line.strip())

def isvalid(string):
    seg=jieba.cut(string)
    cnt=0
    for word in seg:
        if word not in stopword and word not in punc:
            cnt+=1
    return True if cnt>0 else False

def isvalidQA(sentences):
    if not isvalid(sentences[0]):
        return 0,None
    cnt=0
    new_qa=[]
    new_qa.append(sentences[0])
    n=len(sentences)
    for i in range(1,n):
        if(isvalid(sentences[i])):
            cnt+=1
            new_qa.append(sentences[i])
    if cnt<1:
        return 0,None
    return cnt+1,new_qa

def Get_QAPair(text):
    try:
        n=len(text)
        _QA=[]
        i=0
        while i<n:
            pair=[]
            line=text[i]
            if line[0]=='Q':
                q=line.split(':')[1].strip()
                if q:
                    pair.append(q)
                    i+=1
                    line=text[i]
                    while i<n and line[0]=='A':
                        a=line.split(':')[1].strip()
                        if a:
                            pair.append(a)
                        i+=1
                        if i<n:
                            line=text[i]
                    val,pair=isvalidQA(pair)
                  #  print(val,pair)
                    if val>1:
                        _QA.append(pair)
            i+=1
    except Exception as e:
        print(0)
        print(e)
        return _QA
    return _QA

def Generate_QA():      
    cnt=0
    while True:
        file_name=abs_path+'QAPair/QAPiar%d.txt'
        try:
            cnt+=1
            name=file_name%cnt
            with open(name,'r',encoding='utf-8-sig')as f:
                QA.extend(Get_QAPair(f.readlines()))
        except Exception as e:
           # print(e)
            break

def similarity(s1,s2):
    seg1=jieba.cut(s1)
    seg2=jieba.cut(s2)
    p1=[]
    p2=[]
    for word in seg1:
        p1.append(word)
    for word in seg2:
        p2.append(word)
    #n=min(len(p1),len(p2))
    n=len(p2)
    ave=0
    ws_tool = WordSimilarity2010()
    for word1 in p2:
        #print(word1)
        x=0
        for word2 in p1:
        #print(p1[i],p2[i],end=' ')
            x=max(x,ws_tool.similarity(word1,word2))
            #print(word1,word2,x,end=' ')
        ave+=x/n
   #z print(s1,s2,ave)
    return ave
#simer = sim_hownet.SimHownet()
def Get_Ans(question):
    dis=-1
    n=len(QA)
    num=0
    for i in range(n):        
        if random.randint(0,1000)>500:
            #print(i)
            try:
               # r=synonyms.compare(QA[i][0],question,seg=True,ignore=True)
                
               # print('d',r)
                r=fenci.similarity(QA[i][0],question)
                #r=similarity(QA[i][0],question)
                #r=simer.distance(QA[i][0],question)
                if r>dis:
                    num=i
                    dis=r
            except Exception as e:
                pass
                #print(e)
                #print(QA[i][0])
    if __name__=='__main__':
        print(QA[num][0],dis)
    return QA[num][1],dis

def load():
    print("\n\n--QQChat模块加载中...--")
    start=time.time()
    Generate_QA()
    end=time.time()
    print("--QAPair大小:%d--\n--加载时间:%fs--\n\n"%(len(QA),end-start))

def respond(question):
    return Get_Ans(question)

def main():
    while True:
        question=input('>>').strip()
        if question=='exit':
            break
        start=time.time()
        ans=Get_Ans(question)
        end=time.time()
        print('>>'+ans)
        print("Running Time:%fs"%(end-start))    

load()        
    
if __name__=='__main__':
    main()   
    