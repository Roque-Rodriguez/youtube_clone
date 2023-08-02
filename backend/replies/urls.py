from django.urls import path
from .views import get_replies, create_reply

urlpatterns = [
    path('', get_replies),        # Endpoint to get all replies
    path('post_reply/', create_reply),  # Endpoint to create a new reply
]

#want to ask if I can just use ' ' for create replies