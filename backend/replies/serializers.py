from rest_framework import serializers
from .models import Reply

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'user', 'comment', 'text', 'user_id', 'comment_id']

        user_id = serializers.IntegerField(write_only=True)
        comment_id = serializers.IntegerField(write_only=True)