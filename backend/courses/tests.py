from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from accounts.models import User
from .models import Assignment, Submission, Notification

# Create your tests here.

class SubmissionGradeTest(TestCase):
    def setUp(self):
        self.teacher = User.objects.create_user(username='guru', email='guru@example.com', password='testpass', role='guru')
        self.student = User.objects.create_user(username='siswa', email='siswa@example.com', password='testpass', role='siswa')
        self.assignment = Assignment.objects.create(course_id=1, title='Tugas', instructions='...', due_date='2030-01-01T00:00', created_at='2030-01-01T00:00', updated_at='2030-01-01T00:00')
        self.submission = Submission.objects.create(assignment=self.assignment, student=self.student)
        self.client = APIClient()
        self.login_url = reverse('login')
        self.grade_url = reverse('submission-grade', args=[self.submission.id])

    def test_teacher_can_grade_submission(self):
        resp = self.client.post(self.login_url, {'username': 'guru', 'password': 'testpass'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        resp = self.client.put(self.grade_url, {'grade': 'A', 'feedback': 'Good job'}, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['grade'], 'A')

class NotificationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='notifuser', email='notif@example.com', password='testpass', role='siswa')
        self.client = APIClient()
        self.login_url = reverse('login')
        self.notif_url = reverse('notification-list')
        Notification.objects.create(user=self.user, message='Test notif')

    def test_user_can_see_own_notification(self):
        resp = self.client.post(self.login_url, {'username': 'notifuser', 'password': 'testpass'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        resp = self.client.get(self.notif_url)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(any('Test notif' in n['message'] for n in resp.data))
