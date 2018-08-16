from django.shortcuts import render
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
# reject CSRF
import RunQA
import json

from django.shortcuts import  HttpResponse


def index(requst):
    return HttpResponse("hello world")


def main(request):
    return render(request, "index.html")


def starter(request):
    return render(request, "starter.html")


@csrf_exempt
def get_answer(request):
    answer = RunQA.major(request.POST['input'])
    return HttpResponse(json.dumps(answer), content_type='application/json')