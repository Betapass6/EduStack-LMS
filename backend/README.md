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

## Konfigurasi Cloudinary (File Upload)

1. Daftar akun di https://cloudinary.com/ dan dapatkan CLOUD_NAME, API_KEY, API_SECRET.
2. Tambahkan ke environment (bisa di .env atau docker-compose):
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. File upload (materi, tugas, dsb) akan otomatis tersimpan di Cloudinary.

## Jalankan dengan Docker

1. Pastikan Docker & docker-compose sudah terinstall.
2. Jalankan:
   ```bash
   docker-compose up --build
   ```
3. Backend akan berjalan di http://localhost:8000 