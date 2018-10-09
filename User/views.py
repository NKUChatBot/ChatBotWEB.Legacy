from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Apps.main import response
from django.http import JsonResponse
from random import choice

def JsonResponseZh(json_data):
    """
    因为返回含中文的 Json 数据总是需要设置 {'ensure_ascii': False}，所以直接在此集成
    :param json_data: 需要返回的数据
    """
    return JsonResponse(json_data, json_dumps_params={'ensure_ascii': False})


def welcome(request):
    return render(request, "starter.html")


def chatbot(request):
    return render(request, "index.html")


@csrf_exempt
def ask_for_answer(request):
    question = request.POST.get("input")
    answer = response(question)
    return JsonResponseZh({"data": answer})


@csrf_exempt
def get_greet(request):
    greeing_dict = {
        'init': ["你好呀，我是上知天文下知地理的南小开！！！",
                 "嘿，你好，我是南小开。你想问什么？",
                 "Hello there, What can I do for you?",
                 "那边的朋友你们好吗！！！？？？",
                 "我好菜啊"],
        'friendly': ["What a great thing you just said. I'm so glad you said it.",
                     "Ahh, yes, I agree. It is so great to say things, isn't it?",
                     "Please, tell me more. It brings me such joy to respond to the things you say.",
                     "Ahh, yes valid point. Or was it? Either way, you're fantastic!",
                     "Anyways, did I mention that I hope you're having a great day? If not, I hope it gets better!"],
        'confuse': ["我不知道，妈妈还没有告诉我",
                    "小开肚子里还没吃这个知识，不如你告诉我吧",
                    "我不明白你在说什么",
                    "I just don't know if I can trust that thing you just said...",
                    "Oh, interesting. I totally believe you. (Not really)",
                    "Uh-huh, yeah, listen...I'm not going to fully invest in this conversation until I'm certain I know your motive.",
                    "Wait, what the heck is that?? Oh, phewf, it's just another rogue letter 'R' that escaped the letter pool.",
                    "You can't fool me, I know that's not true!"],
        'boastful': ["我可厉害了",
                     "哈哈哈，我是最棒的",
                     "That's interesting. I'll have you know that I have an extremely advanced learning algorithm that analyzes everything you say...well, not really, but I wish.",
                     "Hey, while I have you, I should probably tell you that I can respond in 4 seconds flat. Which is pretty fast if you ask me.",
                     "Listen, that's neat and all, but look how fast I can calculate this math problem: 12345 * 67890 = " + str(
                         12345 * 67890) + ". Didn't even break a sweat.",
                     "Oh, I forgot to mention that I've existed for over 100,000 seconds and that's something I'm quite proud of.",
                     "Wow, thats pretty cool, but I can hold my breath for all of eternity. And it took me 0 seconds to gain that ability."]
    }
    mood = request.POST.get("mood")
    greet = choice(greeing_dict[mood]) \
        if mood is not None else choice(greeing_dict["init"])
    return JsonResponseZh({"data": greet})