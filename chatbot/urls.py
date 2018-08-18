"""chatbot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import  include,url
from django.contrib import admin
from django.urls import path
from myapp import views


urlpatterns = [
    # path('admin/', admin.site.urls),
    url(r'^index/', views.index),
    url(r"^bot/", views.main),
    url(r'^$', views.starter),
    url(r'^ajax/ask/', views.get_answer),
    url(r'^ajax/greet/', views.get_greeting)
]


handler404 = views.page_not_found
handler500 = views.page_error
