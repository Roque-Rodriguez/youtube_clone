from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Comment
from .serializers import CommentSerializer

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow any user to access this endpoint
def get_comments_by_video_id(request, video_id):
    comments = Comment.objects.filter(video_id=video_id)
    serializer = CommentSerializer(comments, many=True)  # Serialize multiple objects
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Require JWT authorization for this endpoint
def create_comment(request):
    # Access the user using `request.user`
    user = request.user

    # Deserialize the request data and create a new comment
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)  # Save the user along with the comment
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
