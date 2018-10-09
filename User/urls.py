from django.urls import path
from . import views

app_name = "user"
urlpatterns = [
    path(r"", views.welcome, name="welcome"),
    path("chatbot/", views.chatbot, name="chatbot"),
    path("ask/", views.ask_for_answer, name="ask"),
    path("greet/", views.get_greet, name="greet"),
]
