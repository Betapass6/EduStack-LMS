import { Component, OnInit } from '@angular/core';
import { AssignmentService, Assignment } from 'src/app/core/services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-assignment-list',
  templateUrl: './teacher-assignment-list.component.html',
})
export class TeacherAssignmentListComponent implements OnInit {
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

  goToAssignment(assignment: Assignment) {
    this.router.navigate(['/teacher/courses', this.courseId, 'assignments', assignment.id]);
  }

  addAssignment() {
    if (this.courseId) {
      this.router.navigate(['/teacher/courses', this.courseId, 'assignments', 'new']);
    }
  }
} 