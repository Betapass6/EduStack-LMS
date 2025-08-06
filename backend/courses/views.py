from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Course, Module, Lesson, Enrollment, Assignment, Submission, Quiz, QuizQuestion, QuizSubmission, Notification
from .serializers import CourseSerializer, ModuleSerializer, LessonSerializer, EnrollmentSerializer, AssignmentSerializer, SubmissionSerializer, QuizSerializer, QuizQuestionSerializer, QuizSubmissionSerializer, NotificationSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'guru'

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'admin'

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all().order_by('order')
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().order_by('order')
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all().order_by('-created_at')
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, IsTeacher]

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all().order_by('-submitted_at')
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['put'], permission_classes=[IsAuthenticated, IsTeacher])
    def grade(self, request, pk=None):
        submission = self.get_object()
        grade = request.data.get('grade')
        feedback = request.data.get('feedback', '')
        if grade is None:
            return Response({'detail': 'Grade is required.'}, status=status.HTTP_400_BAD_REQUEST)
        submission.grade = grade
        submission.feedback = feedback
        submission.save()
        serializer = self.get_serializer(submission)
        return Response(serializer.data)

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated, IsTeacher]

class QuizQuestionViewSet(viewsets.ModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuizSubmissionViewSet(viewsets.ModelViewSet):
    queryset = QuizSubmission.objects.all().order_by('-submitted_at')
    serializer_class = QuizSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def submit_quiz(self, request):
        quiz_id = request.data.get('quiz')
        answers = request.data.get('answers', {})
        quiz = Quiz.objects.get(id=quiz_id)
        questions = quiz.questions.all()
        score = 0
        for q in questions:
            qid = str(q.id)
            if qid in answers and answers[qid] == q.correct_answer:
                score += 1
        total = questions.count()
        percent = (score / total) * 100 if total > 0 else 0
        submission = QuizSubmission.objects.create(
            quiz=quiz,
            student=request.user,
            answers=answers,
            score=percent
        )
        serializer = QuizSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        # Admin bisa melihat semua notifikasi, user lain hanya notifikasi miliknya
        user = self.request.user
        if getattr(user, 'role', None) == 'admin':
            return Notification.objects.all().order_by('-created_at')
        return Notification.objects.filter(user=user).order_by('-created_at')
