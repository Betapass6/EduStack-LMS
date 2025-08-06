import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data kelas';
        this.loading = false;
      }
    });
  }
} 