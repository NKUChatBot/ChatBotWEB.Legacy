#coding:utf8

import urllib2
import json
import re
from string import digits

def is_chinese(uchar):
    """判断一个unicode是否是汉字"""
    if uchar >= u'\u4e00' and uchar <= u'\u9fa5':
        return True
    else:
        return False


def is_number(uchar):
    """判断一个unicode是否是数字"""
    if uchar >= u'\u0030' and uchar <= u'\u0039':
        return True
    else:
        return False

def is_alphabet(uchar):
    """判断一个unicode是否是英文字母"""
    if (uchar >= u'\u0041' and uchar <= u'\u005a') or (uchar >= u'\u0061' and uchar <= u'\u007a'):
        return True
    else:
        return False
def format_str(content):
    content = unicode(content,'utf-8')
    content_str = ''
    for i in content:
        if is_chinese(i):
            content_str = content_str+i
    return content_str



if __name__=='__main__':
  mode = 'transit'
  origin = '南开大学'
  destination = '天津站'
  origin_region  = ''
  destination_region = ''
  output = ''


  url = "http://api.map.baidu.com/direction/v1?mode="+mode\
        +"&origin="+origin\
        +"&destination="+destination\
        +"&origin_region="+origin_region\
        +"&destination_region="+destination_region\
        +"&output="+output\
        +"&ak=GuGZ01jekpjxCa1IGQCDNv608jm48wDt"

  req = urllib2.Request(url)
  res = urllib2.urlopen(req)
  s=res.read()

  print s
