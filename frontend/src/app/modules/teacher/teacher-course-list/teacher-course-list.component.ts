import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from 'src/app/core/services/course.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.component.html',
  // styleUrls: ['./teacher-course-list.component.scss']
})
export class TeacherCourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error = '';

  constructor(private courseService: CourseService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (data) => {
        // Filter hanya kelas yang diajar guru ini
        const user = this.auth.getUser();
        this.courses = data.filter(c => c.teacher === user.username);
        this.loading = false;
      },
      error: () => {
        this.error = 'Gagal memuat data kelas';
        this.loading = false;
      }
    });
  }

  goToCourse(course: Course) {
    this.router.navigate(['/teacher/courses', course.id]);
  }

  addCourse() {
    this.router.navigate(['/teacher/courses/new']);
  }
} 