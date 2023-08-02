from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Reply
from .serializers import ReplySerializer

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow any user to access this endpoint
def get_replies(request):
    replies = Reply.objects.all()
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Require JWT authorization for this endpoint
def create_reply(request):
    #   user = request.user
    #Comments_id = request.data.get(Comments_id)
    # if not Comments_id:
    #     return Response({"message": "Comments_id is required in the request data."}, status=400)
    # try:
    #     Comments = Comments.objects.get(id=comment_id)
    # except Comments.DoesNotExist:
    #     return Response({"message": "Comment not found"}, status=404)
    # Create the reply with the comment association
    serializer = ReplySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
