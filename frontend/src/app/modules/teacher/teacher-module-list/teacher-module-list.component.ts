import { Component, OnInit } from '@angular/core';
import { ModuleService, Module } from 'src/app/core/services/module.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-module-list',
  templateUrl: './teacher-module-list.component.html',
  styleUrls: ['./teacher-module-list.component.scss']
})
export class TeacherModuleListComponent implements OnInit {
  modules: Module[] = [];
  loading = true;
  error = '';
  courseId: string | null = null;

  constructor(private moduleService: ModuleService, private route: ActivatedRoute, private router: Router) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.moduleService.getByCourse(this.courseId).subscribe({
        next: (data) => {
          this.modules = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat modul';
          this.loading = false;
        }
      });
    }
  }

  goToModule(module: Module) {
    this.router.navigate(['/teacher/modules', module.id]);
  }

  addModule() {
    if (this.courseId) {
      this.router.navigate(['/teacher/courses', this.courseId, 'modules', 'new']);
    }
  }
} 