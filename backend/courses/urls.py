from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, ModuleViewSet, LessonViewSet, EnrollmentViewSet, AssignmentViewSet, SubmissionViewSet, QuizViewSet, QuizQuestionViewSet, QuizSubmissionViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'lessons', LessonViewSet, basename='lesson')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'assignments', AssignmentViewSet, basename='assignment')
router.register(r'submissions', SubmissionViewSet, basename='submission')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'quizquestions', QuizQuestionViewSet, basename='quizquestion')
router.register(r'quizsubmissions', QuizSubmissionViewSet, basename='quizsubmission')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = router.urls 