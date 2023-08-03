from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import Comment
from .serializers import CommentSerializer

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow any user to access this endpoint
def get_comments_by_video_id(request, video_id):
    comments = Comment.objects.filter(video_id=video_id)
    serializer = CommentSerializer(comments, many=True)  
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Require JWT authorization for this endpoint
def create_comment(request):
    # Access the user using `request.user`
    user = request.user

   
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)  # Save the user along with the comment
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser]) 
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"message": "Comment not found"}, status=404)

    if comment.user != request.user and not request.user.is_staff:
        return Response({"message": "You are not allowed to delete this comment"}, status=403)

    comment.delete()
    return Response({"message": "Comment deleted successfully"}, status=204)