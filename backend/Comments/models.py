from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import User

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.CharField(max_length=100)
    text = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
