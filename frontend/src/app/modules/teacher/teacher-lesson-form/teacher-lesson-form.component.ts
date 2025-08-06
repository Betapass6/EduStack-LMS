import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonService, Lesson } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-teacher-lesson-form',
  templateUrl: './teacher-lesson-form.component.html',
  styleUrls: ['./teacher-lesson-form.component.scss']
})
export class TeacherLessonFormComponent {
  title = '';
  content = '';
  order = 0;
  error = '';
  loading = false;
  isEdit = false;
  lessonId: string | null = null;
  moduleId: string | null = null;

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId');
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    if (this.lessonId) {
      this.isEdit = true;
      this.loading = true;
      this.lessonService.getByModule(this.moduleId!).subscribe({
        next: (data) => {
          const les = data.find(l => l.id === this.lessonId);
          if (les) {
            this.title = les.title;
            this.content = les.content;
            this.order = les.order;
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat data lesson';
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    this.loading = true;
    const lessonData: Partial<Lesson> = {
      title: this.title,
      content: this.content,
      order: this.order
    };
    if (this.isEdit && this.lessonId) {
      this.lessonService.update(this.lessonId, lessonData).subscribe({
        next: () => {
          this.loading = false;
          if (this.moduleId) this.router.navigate(['/teacher/modules', this.moduleId, 'lessons']);
        },
        error: () => {
          this.error = 'Gagal update lesson';
          this.loading = false;
        }
      });
    } else if (this.moduleId) {
      this.lessonService.create(this.moduleId, lessonData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher/modules', this.moduleId, 'lessons']);
        },
        error: () => {
          this.error = 'Gagal tambah lesson';
          this.loading = false;
        }
      });
    }
  }
} 