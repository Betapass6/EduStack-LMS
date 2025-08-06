# EduStack LMS - Learning Management System

Sistem Manajemen Pembelajaran Online berbasis Angular (frontend) dan Django (backend).

## 🚀 Fitur Utama

- **Autentikasi**: Login/Register dengan JWT
- **Role-based Access**: Admin, Guru, dan Siswa
- **Manajemen Kursus**: CRUD kursus, modul, dan materi
- **Sistem Tugas**: Upload, submit, dan grading
- **Forum Diskusi**: Interaksi siswa-guru
- **Sistem Nilai**: Tracking progress dan nilai
- **File Upload**: Cloudinary integration
- **Responsive Design**: Material Design UI

## 🛠 Tech Stack

### Frontend
- Angular 17
- Angular Material
- TypeScript
- RxJS
- SCSS

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Cloudinary (file storage)

### DevOps
- Docker & Docker Compose
- CORS enabled
- Environment variables

## 📋 Prerequisites

- Node.js 18+ & npm
- Python 3.8+
- PostgreSQL
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd EduStack-LMS
   ```

2. **Setup environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your values
   
   # Frontend
   cp frontend/env.example frontend/.env
   # Edit frontend/.env with your values
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database and Cloudinary credentials
   ```

5. **Setup database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Run backend**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API URL
   ```

4. **Run frontend**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=1
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=EduStack
DB_USER=postgres
DB_PASS=your-password
DB_HOST=localhost
DB_PORT=5432
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (.env)
```env
API_URL=http://localhost:8000/api
NODE_ENV=development
```

## 📱 Usage

### Default Users
- **Admin**: Access admin panel at `/admin`
- **Guru**: Create courses, assignments, grade students
- **Siswa**: Enroll in courses, submit assignments, view grades

### API Endpoints
- `POST /api/login/` - User login
- `POST /api/register/` - User registration
- `GET /api/courses/` - List courses
- `POST /api/courses/` - Create course (teacher only)
- `GET /api/assignments/` - List assignments
- `POST /api/submissions/` - Submit assignment

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
EduStack-LMS/
├── backend/
│   ├── accounts/          # User authentication
│   ├── courses/           # Course management
│   ├── submissions/       # Assignment submissions
│   ├── grades/           # Grading system
│   ├── forum/            # Discussion forum
│   └── lms_project/      # Django settings
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/     # Services, guards, interceptors
│   │   │   ├── modules/  # Feature modules
│   │   │   └── shared/   # Shared components
│   │   └── environments/ # Environment configs
│   └── package.json
└── docker-compose.yml
```

## 🔒 Security Features

- JWT Authentication with refresh tokens
- Role-based access control
- CORS configuration
- Input validation
- SQL injection protection
- XSS protection

## 🚀 Deployment

### Production Setup
1. Set `DEBUG=0` in backend environment
2. Configure production database
3. Set up Cloudinary credentials
4. Configure domain in `ALLOWED_HOSTS`
5. Use production-grade web server (Gunicorn + Nginx)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments 