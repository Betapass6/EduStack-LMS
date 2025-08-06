from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from courses.models import Course, Assignment, Submission, Quiz, QuizSubmission
from accounts.models import User

class GradeReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = getattr(user, 'role', None)
        data = {}
        if role == 'siswa':
            # Assignment
            submissions = Submission.objects.filter(student=user)
            assignment_scores = [float(s.grade) for s in submissions if s.grade]
            assignment_avg = sum(assignment_scores) / len(assignment_scores) if assignment_scores else 0
            # Quiz
            quizsubs = QuizSubmission.objects.filter(student=user)
            quiz_scores = [float(q.score) for q in quizsubs]
            quiz_avg = sum(quiz_scores) / len(quiz_scores) if quiz_scores else 0
            data = {
                'assignment_avg': assignment_avg,
                'quiz_avg': quiz_avg,
                'assignments': [
                    {
                        'assignment': s.assignment.title,
                        'course': s.assignment.course.title,
                        'grade': s.grade,
                        'feedback': s.feedback
                    } for s in submissions
                ],
                'quizzes': [
                    {
                        'quiz': q.quiz.title,
                        'course': q.quiz.course.title,
                        'score': q.score
                    } for q in quizsubs
                ]
            }
        elif role == 'guru':
            # Rekap nilai semua siswa di kelas yang diajar
            courses = Course.objects.filter(teacher=user)
            course_data = []
            for course in courses:
                students = User.objects.filter(enrollments__course=course, role='siswa').distinct()
                student_scores = []
                for student in students:
                    submissions = Submission.objects.filter(student=student, assignment__course=course)
                    quizsubs = QuizSubmission.objects.filter(student=student, quiz__course=course)
                    assignment_avg = sum([float(s.grade) for s in submissions if s.grade]) / (len(submissions) or 1)
                    quiz_avg = sum([float(q.score) for q in quizsubs]) / (len(quizsubs) or 1)
                    student_scores.append({
                        'student': student.username,
                        'assignment_avg': assignment_avg,
                        'quiz_avg': quiz_avg
                    })
                course_data.append({
                    'course': course.title,
                    'students': student_scores
                })
            data = {'courses': course_data}
        return Response(data)
