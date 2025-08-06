import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Course } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit {
  course?: Course;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getById(id).subscribe({
        next: (data) => {
          this.course = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Gagal memuat detail kelas';
          this.loading = false;
        }
      });
    }
  }
} 