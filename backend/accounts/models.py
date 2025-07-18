from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('guru', 'Guru'),
        ('siswa', 'Siswa'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='siswa')
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
