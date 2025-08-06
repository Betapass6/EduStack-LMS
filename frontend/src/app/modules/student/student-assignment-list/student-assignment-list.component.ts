import { Component, OnInit } from '@angular/core';
import { AssignmentService, Assignment } from 'src/app/core/services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-assignment-list',
  templateUrl: './student-assignment-list.component.html',
  // styleUrls: ['./student-assignment-list.component.scss']
})
export class StudentAssignmentListComponent implements OnInit {
  assignments: Assignment[] = [];
  loading = true;
  error = '';
  courseId: string | null = null;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private router: Router) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.assignmentService.getByCourse(this.courseId).subscribe({
        next: (data) => {
          this.assignments = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat assignment';
          this.loading = false;
        }
      });
    }
  }

  goToSubmit(assignment: Assignment) {
    this.router.navigate(['/student/courses', this.courseId, 'assignments', assignment.id, 'submit']);
  }
} 