import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from 'src/app/core/services/submission.service';

@Component({
  selector: 'app-student-submission-form',
  templateUrl: './student-submission-form.component.html',
  // styleUrls: ['./student-submission-form.component.scss']
})
export class StudentSubmissionFormComponent {
  file?: File;
  error = '';
  loading = false;
  assignmentId: string | null = null;
  courseId: string | null = null;

  constructor(private submissionService: SubmissionService, private route: ActivatedRoute, private router: Router) {
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.assignmentId || !this.file) {
      this.error = 'File jawaban harus diupload.';
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('submission_file', this.file);
    this.submissionService.submit(this.assignmentId, formData).subscribe({
      next: () => {
        this.loading = false;
        if (this.courseId) this.router.navigate(['/student/courses', this.courseId, 'assignments']);
      },
      error: () => {
        this.error = 'Gagal submit jawaban.';
        this.loading = false;
      }
    });
  }
} 