from django.test import TestCase
from .models import User
from rest_framework.test import APIClient
from django.urls import reverse
from django.http import request
from django.http import response

# Create your tests here.

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass', role='siswa')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.role, 'siswa')
        self.assertTrue(user.check_password('testpass'))

class AuthEndpointTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass', role='siswa')
        self.client = APIClient()
        self.login_url = reverse('login')
        self.me_url = reverse('me')
        self.logout_url = reverse('logout')

    def test_me_endpoint(self):
        resp = self.client.post(self.login_url, {'username': 'testuser', 'password': 'testpass'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        resp = self.client.get(self.me_url)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['username'], 'testuser')

    def test_logout_endpoint(self):
        resp = self.client.post(self.login_url, {'username': 'testuser', 'password': 'testpass'}, format='json')
        refresh = resp.data['refresh']
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        resp = self.client.post(self.logout_url, {'refresh': refresh}, format='json')
        self.assertEqual(resp.status_code, 205)
