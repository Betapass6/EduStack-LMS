from accounts.models import User
from courses.models import Course, Module, Lesson, Assignment, Submission, Enrollment
from forum.models import Discussion
from django.utils import timezone

# Clear all data (optional, for idempotency)
User.objects.all().delete()
Course.objects.all().delete()
Module.objects.all().delete()
Lesson.objects.all().delete()
Assignment.objects.all().delete()
Submission.objects.all().delete()
Enrollment.objects.all().delete()
Discussion.objects.all().delete()

# 1. Create Users
admin = User.objects.create_superuser(username='admin', email='admin@example.com', password='admin123', role='admin')
guru = User.objects.create_user(username='guru1', email='guru1@example.com', password='guru123', role='guru')
siswa = User.objects.create_user(username='siswa1', email='siswa1@example.com', password='siswa123', role='siswa')
siswa2 = User.objects.create_user(username='siswa2', email='siswa2@example.com', password='siswa123', role='siswa')

# 2. Create Course
course = Course.objects.create(title='Matematika Dasar', description='Belajar Matematika dari dasar.', teacher=guru, category='Matematika')

# 3. Enroll siswa ke course
Enrollment.objects.create(student=siswa, course=course)
Enrollment.objects.create(student=siswa2, course=course)

# 4. Create Module & Lesson
module1 = Module.objects.create(title='Aljabar', course=course, order=1)
lesson1 = Lesson.objects.create(module=module1, title='Pengenalan Aljabar', content='Aljabar adalah ...', order=1)

# 5. Create Assignment
assignment = Assignment.objects.create(course=course, title='Tugas Aljabar 1', instructions='Kerjakan soal aljabar berikut...', due_date=timezone.now() + timezone.timedelta(days=7))

# 6. Create Submission
Submission.objects.create(assignment=assignment, student=siswa, grade='90', feedback='Bagus!', submitted_at=timezone.now())
Submission.objects.create(assignment=assignment, student=siswa2, grade='80', feedback='Perlu latihan lagi.', submitted_at=timezone.now())

# 7. Create Discussion
Discussion.objects.create(course=course, author=siswa, message='Pak, saya kurang paham materi ini.', created_at=timezone.now())
Discussion.objects.create(course=course, author=guru, message='Silakan tanyakan bagian mana yang belum jelas.', created_at=timezone.now())

print('SEED DATA BERHASIL!')