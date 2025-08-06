import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuleService, Module } from 'src/app/core/services/module.service';

@Component({
  selector: 'app-teacher-module-form',
  templateUrl: './teacher-module-form.component.html',
  styleUrls: ['./teacher-module-form.component.scss']
})
export class TeacherModuleFormComponent {
  title = '';
  order = 0;
  error = '';
  loading = false;
  isEdit = false;
  moduleId: string | null = null;
  courseId: string | null = null;

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (this.moduleId) {
      this.isEdit = true;
      this.loading = true;
      this.moduleService.getByCourse(this.courseId!).subscribe({
        next: (data) => {
          const mod = data.find(m => m.id === this.moduleId);
          if (mod) {
            this.title = mod.title;
            this.order = mod.order;
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat data modul';
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    this.loading = true;
    const moduleData: Partial<Module> = {
      title: this.title,
      order: this.order
    };
    if (this.isEdit && this.moduleId) {
      this.moduleService.update(this.moduleId, moduleData).subscribe({
        next: () => {
          this.loading = false;
          if (this.courseId) this.router.navigate(['/teacher/courses', this.courseId, 'modules']);
        },
        error: () => {
          this.error = 'Gagal update modul';
          this.loading = false;
        }
      });
    } else if (this.courseId) {
      this.moduleService.create(this.courseId, moduleData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher/courses', this.courseId, 'modules']);
        },
        error: () => {
          this.error = 'Gagal tambah modul';
          this.loading = false;
        }
      });
    }
  }
} 