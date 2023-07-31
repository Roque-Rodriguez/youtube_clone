from django.urls import path
from .views import get_comments_by_video_id, create_comment

urlpatterns = [
    path('<str:video_id>/', get_comments_by_video_id),
    path('', create_comment),
]