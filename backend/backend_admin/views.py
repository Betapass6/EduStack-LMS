from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from accounts.models import User
from courses.models import Course, Assignment, Quiz, Submission, QuizSubmission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'admin'

class AdminStatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        # (Opsional) Batasi hanya admin
        data = {
            'user_count': User.objects.count(),
            'student_count': User.objects.filter(role='siswa').count(),
            'teacher_count': User.objects.filter(role='guru').count(),
            'admin_count': User.objects.filter(role='admin').count(),
            'course_count': Course.objects.count(),
            'assignment_count': Assignment.objects.count(),
            'quiz_count': Quiz.objects.count(),
            'submission_count': Submission.objects.count(),
            'quiz_submission_count': QuizSubmission.objects.count(),
        }
        return Response(data) 