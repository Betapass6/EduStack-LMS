# EduStack LMS Backend

Backend aplikasi ini dibangun dengan **Django 4+** dan **Django REST Framework**.

## Struktur Direktori (rencana)

```
/lms_project
  ├── lms_project           # Django project utama
  ├── accounts              # Model user dan role
  ├── courses               # Kelas, materi, tugas
  ├── submissions           # Tugas/quiz submission
  ├── grades                # Penilaian
  ├── forum                 # Diskusi/komentar
  ├── api                   # DRF Viewsets, Serializers
  └── media                 # File upload
```

## Setup Awal

1. Pastikan Python 3.10+ & pip sudah terinstall.
2. Jalankan:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
3. API dapat diakses di `http://localhost:8000`

---

- Gunakan PostgreSQL untuk database
- Auth JWT via djangorestframework-simplejwt 