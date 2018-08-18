# -*- coding: utf-8 -*-

f = open("1.txt")             # 返回一个文件对象
pre_line=''
result=list();

for eachline in f:
    line=eachline.strip()
    if line.startswith('职称'):
        #print(pre_line)
        result.append(pre_line+" nr")        
    pre_line=line;        
print(result)

open('name.txt', 'w').write('%s' % '\n'.join(result))


f.close()