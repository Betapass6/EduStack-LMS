from rest_framework import serializers
from .models import Course, Module, Lesson, Enrollment, Assignment, Submission, Quiz, QuizQuestion, QuizSubmission, Notification
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

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'title', 'instructions', 'due_date', 'attachment', 'created_at', 'updated_at']

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'student', 'submission_file', 'submitted_at', 'grade', 'feedback']

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'course', 'title', 'description', 'duration_minutes', 'created_at', 'questions']

class QuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = ['id', 'quiz', 'student', 'answers', 'score', 'submitted_at']

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at'] 