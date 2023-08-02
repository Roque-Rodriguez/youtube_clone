from django.urls import path
from .views import get_comments_by_video_id, create_comment, delete_comment

urlpatterns = [
    path('<str:video_id>/', get_comments_by_video_id),
    path('', create_comment),
    path('delete/<int:comment_id>/', delete_comment),
    
]