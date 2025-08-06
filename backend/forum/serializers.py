from rest_framework import serializers
from .models import Discussion

class DiscussionSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Discussion
        fields = ['id', 'course', 'author', 'author_username', 'message', 'replied_to', 'created_at', 'replies']

    def get_replies(self, obj):
        # Recursive: ambil semua reply untuk diskusi ini
        if obj.replies.exists():
            return DiscussionSerializer(obj.replies.all(), many=True).data
        return [] 