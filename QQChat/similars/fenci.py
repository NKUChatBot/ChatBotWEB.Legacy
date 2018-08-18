
import sys 
import math
import os
#sys.setdefaultencoding('gbk')




log = lambda x: float('-inf') if not x else math.log(x)
prob = lambda x: d[x] if x in d else 0 if len(x)>1 else 1

abs_path = os.path.split(os.path.realpath(__file__))[0]+'/'
d = {}

def initi(filename=abs_path+'SogouLabDic.dic'):
    d['_t_'] = 0.0
    with open(filename, 'r',encoding='gb18030') as handle:
        for line in handle:
            word, freq = line.split('\t')[0:2]
            d['_t_'] += int(freq)+1
            try:
                d[word.decode('gbk')] = int(freq)+1
            except:
                d[word] = int(freq)+1
initi()

def solve(s):
    l = len(s)
    p = [0 for i in range(l+1)]
    t = [0 for i in range(l)]
    for i in range(l-1, -1, -1):
        p[i], t[i] = max((log(prob(s[i:i+k])/d['_t_'])+p[i+k], k)
                        for k in range(1, l-i+1))
    while p[l]<l:
        yield s[p[l]:p[l]+t[p[l]]]
        p[l] += t[p[l]]

def cos_dist(a, b):
    if len(a) != len(b):
        return None
    part_up = 0.0
    a_sq = 0.0
    b_sq = 0.0
    for a1, b1 in zip(a,b):
        part_up += a1*b1
        a_sq += a1**2
        b_sq += b1**2
    part_down = math.sqrt(a_sq*b_sq)
    if part_down == 0.0:
        return None
    else:
        return part_up / part_down

def similarity(s,ss):
    s1=list(solve(s))
    s2=list(solve(ss))
    
    key=list(set(s1+s2))
        
    
    keyLen=len(key)
    keyValue=0
    
    
    sk1=[keyValue]*keyLen
    sk2=[keyValue]*keyLen
    
    for index,keyElement in enumerate(key):
        if keyElement in s1:
            sk1[index]=sk1[index]+1
        if keyElement in s2:
            sk2[index]=sk2[index]+1 
    return (cos_dist(sk1,sk2))


 
if __name__ == '__main__':
    initi()
    s = u'ÖÜ½ÜÂ×ÊÇÒ»¸ö¸èÊÖ,Ò²ÊÇÒ»¸ö²æ²æ'
    ss=u'ÖÜ½ÜÂ×²»ÊÇÒ»¸ö²æ²æ£¬µ«ÊÇÊÇÒ»¸ö¸èÊÖ'

    s1=list(solve(s))
    s2=list(solve(ss))
    
    key=list(set(s1+s2))
        
    
    keyLen=len(key)
    keyValue=0
    
    
    sk1=[keyValue]*keyLen
    sk2=[keyValue]*keyLen
    
    for index,keyElement in enumerate(key):
        if keyElement in s1:
            sk1[index]=sk1[index]+1
        if keyElement in s2:
            sk2[index]=sk2[index]+1 
    print(cos_dist(sk1,sk2))
