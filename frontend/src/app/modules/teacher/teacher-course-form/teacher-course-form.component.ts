import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService, Course } from 'src/app/core/services/course.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-teacher-course-form',
  templateUrl: './teacher-course-form.component.html',
  // styleUrls: ['./teacher-course-form.component.scss']
})
export class TeacherCourseFormComponent {
  title = '';
  description = '';
  category = '';
  error = '';
  loading = false;
  isEdit = false;
  courseId: string | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEdit = true;
      this.loading = true;
      this.courseService.getById(this.courseId).subscribe({
        next: (data) => {
          this.title = data.title;
          this.description = data.description || '';
          this.category = data.category || '';
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat data kelas';
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    this.loading = true;
    const courseData: Partial<Course> = {
      title: this.title,
      description: this.description,
      category: this.category
    };
    if (this.isEdit && this.courseId) {
      this.courseService.update(this.courseId, courseData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher/courses']);
        },
        error: () => {
          this.error = 'Gagal update kelas';
          this.loading = false;
        }
      });
    } else {
      this.courseService.create(courseData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher/courses']);
        },
        error: () => {
          this.error = 'Gagal tambah kelas';
          this.loading = false;
        }
      });
    }
  }
} 