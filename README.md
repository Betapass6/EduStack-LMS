# EduStack LMS

Fullstack Learning Management System (LMS) berbasis Angular (frontend) & Django (backend).

## Struktur Workspace

```
EduStack LMS/
  frontend/   # Angular 17 (TypeScript)
  backend/    # Django 4+ (REST API)
  idea.txt    # Peta ide project
  README.md   # Ini file
```

Lihat masing-masing folder untuk instruksi setup dan pengembangan.

---

- Frontend: Angular 17, RxJS, Angular Material
- Backend: Django 4+, Django REST Framework, PostgreSQL
- Auth: JWT (djangorestframework-simplejwt)
- DevOps: Docker, Nginx, Gunicorn, GitHub Actions 

**Model Database, ERD (Entity Relationship Diagram)**, && **Skema REST API** dari project **Sistem Manajemen Pembelajaran Online (EduStack LMS)** dengan stack **Angular (frontend)** dan **Django (backend)**:

---

## 🧩 1. **Model Database (Django ORM-based)**

### 🧑‍🎓 `User` (Abstract User)

* id (UUID)
* username
* email
* password
* full\_name
* role → choices: `admin`, `teacher`, `student`
* is\_active
* date\_joined

### 🏫 `Course`

* id (UUID)
* title
* description
* teacher → FK to `User` (role=teacher)
* thumbnail
* category
* created\_at
* updated\_at

### 📚 `Module`

* id (UUID)
* title
* course → FK to `Course`
* order (integer)
* created\_at

### 📝 `Lesson`

* id (UUID)
* module → FK to `Module`
* title
* content (HTML)
* resource\_file (optional)
* order
* created\_at

### 📃 `Assignment`

* id (UUID)
* course → FK to `Course`
* title
* instructions
* due\_date
* attachment (optional)
* created\_at

### 📤 `Submission`

* id (UUID)
* assignment → FK to `Assignment`
* student → FK to `User` (role=student)
* submission\_file
* submitted\_at
* grade
* feedback

### 💬 `Discussion`

* id (UUID)
* course → FK to `Course`
* author → FK to `User`
* message
* replied\_to → FK to `Discussion` (nullable)
* created\_at

### ✅ `Enrollment`

* id (UUID)
* student → FK to `User`
* course → FK to `Course`
* enrolled\_at

---

## 🧮 2. **ERD Diagram Overview (Text-based)**

```
User ─────┬────────┐
          │        │
          │        │
     ↘(teacher)     ↘(student)
      Course         Enrollment
         ↓              ↓
      Module         Course
         ↓
      Lesson
         ↓
     Assignment → Submission ← User
         ↓
     Discussion
```

---

## 🌐 3. **Skema REST API (Full Endpoint List)**

### 🔐 Auth

* `POST /api/auth/register/` → Register user
* `POST /api/auth/login/` → Login (JWT)
* `POST /api/auth/logout/`
* `GET /api/auth/me/` → Get current user

---

### 📘 Course

* `GET /api/courses/` → List all courses
* `GET /api/courses/{id}/` → Course detail
* `POST /api/courses/` → Create course (teacher only)
* `PUT /api/courses/{id}/` → Update
* `DELETE /api/courses/{id}/`

---

### 📦 Module

* `GET /api/courses/{course_id}/modules/` → List modules
* `POST /api/courses/{course_id}/modules/` → Add module
* `PUT /api/modules/{id}/`
* `DELETE /api/modules/{id}/`

---

### 📕 Lesson

* `GET /api/modules/{module_id}/lessons/`
* `POST /api/modules/{module_id}/lessons/`
* `PUT /api/lessons/{id}/`
* `DELETE /api/lessons/{id}/`

---

### 📝 Assignment

* `GET /api/courses/{course_id}/assignments/`
* `POST /api/courses/{course_id}/assignments/`
* `GET /api/assignments/{id}/`
* `PUT /api/assignments/{id}/`
* `DELETE /api/assignments/{id}/`

---

### 📤 Submission

* `POST /api/assignments/{assignment_id}/submit/`
* `GET /api/submissions/{id}/`
* `PUT /api/submissions/{id}/grade/` → Teacher grades

---

### 👥 Enrollment

* `POST /api/courses/{course_id}/enroll/` → Student enrolls
* `GET /api/my-courses/` → List enrolled courses (student)

---

### 💬 Discussion

* `GET /api/courses/{course_id}/discussions/`
* `POST /api/courses/{course_id}/discussions/`
* `POST /api/discussions/{id}/reply/`

---