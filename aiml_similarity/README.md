# aiml_similarity

将Aiml与相似度判定结合

中文aiml参考项目：[https://github.com/yaleimeng/py3Aiml_Chinese](https://github.com/yaleimeng/py3Aiml_Chinese)

相似度判定参考项目：[https://github.com/huyingxi/Synonyms](https://github.com/huyingxi/Synonyms)



## 说明

aiml提供了有效的问题匹配方式，但缺点也是明显的，它的匹配方式过于机械化，模式稍有不用便会失配。

这里在aiml的基础上，做了相似度计算，找到语义最近似的问题。



## 调用示例

```python
import aiml_similarity as a2s

text='南开大学面积多大？'
answer, similar = a2s.respond(text) #answer为返回结果，similar记录相似度

if similar>=0.4:
    print(answer)

>>相似答案：南开大学总面积有多少 相似度: 0.518
>>南开大学总面积有45.19万平方米
```

返回单个答案与问题相似度，相似度在0~1，相似度越大越接近

建议**相似度>=0.4**视为符合条件



注：加载时间需要约10s



作者：[DeAllen](https://github.com/AllenTaken)