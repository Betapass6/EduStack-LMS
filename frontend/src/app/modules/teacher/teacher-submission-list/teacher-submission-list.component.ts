import { Component, OnInit } from '@angular/core';
import { SubmissionService, Submission } from 'src/app/core/services/submission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-submission-list',
  templateUrl: './teacher-submission-list.component.html',
})
export class TeacherSubmissionListComponent implements OnInit {
  submissions: Submission[] = [];
  loading = true;
  error = '';
  assignmentId: string | null = null;
  gradeInput: { [id: string]: string } = {};
  feedbackInput: { [id: string]: string } = {};

  constructor(private submissionService: SubmissionService, private route: ActivatedRoute) {
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId');
  }

  ngOnInit(): void {
    if (this.assignmentId) {
      this.submissionService.getByAssignment(this.assignmentId).subscribe({
        next: (data) => {
          this.submissions = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat submission';
          this.loading = false;
        }
      });
    }
  }

  gradeSubmission(submission: Submission) {
    const grade = this.gradeInput[submission.id] || '';
    const feedback = this.feedbackInput[submission.id] || '';
    this.submissionService.grade(submission.id, grade, feedback).subscribe({
      next: () => {
        alert('Penilaian berhasil!');
        this.ngOnInit();
      },
      error: () => {
        alert('Gagal memberi nilai.');
      }
    });
  }
} 