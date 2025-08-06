from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Discussion
from .serializers import DiscussionSerializer
from courses.models import Course

# Create your views here.

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all().order_by('created_at')
    serializer_class = DiscussionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Discussion.objects.filter(course_id=course_id, replied_to=None).order_by('created_at')
        return Discussion.objects.filter(replied_to=None).order_by('created_at')

    @action(detail=True, methods=['post'])
    def reply(self, request, pk=None):
        parent = self.get_object()
        serializer = DiscussionSerializer(data={
            'course': parent.course.id,
            'author': request.user.id,
            'message': request.data.get('message'),
            'replied_to': parent.id
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
