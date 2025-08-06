import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService, Assignment } from 'src/app/core/services/assignment.service';

@Component({
  selector: 'app-teacher-assignment-form',
  templateUrl: './teacher-assignment-form.component.html',
})
export class TeacherAssignmentFormComponent {
  title = '';
  instructions = '';
  due_date = '';
  attachment?: File;
  error = '';
  loading = false;
  isEdit = false;
  assignmentId: string | null = null;
  courseId: string | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (this.assignmentId) {
      this.isEdit = true;
      this.loading = true;
      this.assignmentService.getById(this.assignmentId).subscribe({
        next: (data) => {
          this.title = data.title;
          this.instructions = data.instructions;
          this.due_date = data.due_date;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat data tugas';
          this.loading = false;
        }
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.attachment = event.target.files[0];
    }
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('instructions', this.instructions);
    formData.append('due_date', this.due_date);
    if (this.attachment) {
      formData.append('attachment', this.attachment);
    }
    if (this.isEdit && this.assignmentId) {
      this.assignmentService.update(this.assignmentId, formData).subscribe({
        next: () => {
          this.loading = false;
          if (this.courseId) this.router.navigate(['/teacher/courses', this.courseId, 'assignments']);
        },
        error: () => {
          this.error = 'Gagal update tugas';
          this.loading = false;
        }
      });
    } else if (this.courseId) {
      formData.append('course', this.courseId);
      this.assignmentService.create(formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher/courses', this.courseId, 'assignments']);
        },
        error: () => {
          this.error = 'Gagal tambah tugas';
          this.loading = false;
        }
      });
    }
  }
} 