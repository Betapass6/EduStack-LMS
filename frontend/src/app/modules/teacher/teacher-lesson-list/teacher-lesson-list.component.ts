import { Component, OnInit } from '@angular/core';
import { LessonService, Lesson } from 'src/app/core/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-lesson-list',
  templateUrl: './teacher-lesson-list.component.html',
  styleUrls: ['./teacher-lesson-list.component.scss']
})
export class TeacherLessonListComponent implements OnInit {
  lessons: Lesson[] = [];
  loading = true;
  error = '';
  moduleId: string | null = null;

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private router: Router) {
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
  }

  ngOnInit(): void {
    if (this.moduleId) {
      this.lessonService.getByModule(this.moduleId).subscribe({
        next: (data) => {
          this.lessons = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat lesson';
          this.loading = false;
        }
      });
    }
  }

  goToLesson(lesson: Lesson) {
    this.router.navigate(['/teacher/modules', this.moduleId, 'lessons', lesson.id]);
  }

  addLesson() {
    if (this.moduleId) {
      this.router.navigate(['/teacher/modules', this.moduleId, 'lessons', 'new']);
    }
  }
} 