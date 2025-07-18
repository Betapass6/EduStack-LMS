from rest_framework import serializers
from .models import Course, Module, Lesson, Enrollment
from accounts.models import User

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'resource_file', 'order', 'created_at']

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = ['id', 'title', 'order', 'created_at', 'lessons']

class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField()
    modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'teacher', 'thumbnail', 'category', 'created_at', 'updated_at', 'modules']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    course = serializers.StringRelatedField()
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'enrolled_at'] 