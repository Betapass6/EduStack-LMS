import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService, Course } from 'src/app/core/services/course.service';
import { Router } from '@angular/router';
import { AssignmentService, Assignment } from 'src/app/core/services/assignment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  courses: Course[] = [];
  loading = true;
  error = '';
  assignments: Assignment[] = [];
  upcomingAssignments: Assignment[] = [];

  constructor(private auth: AuthService, private courseService: CourseService, private router: Router, private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.role = this.auth.getRole();
    this.loadCourses();
    if (this.role === 'siswa') {
      this.loadAssignments();
    }
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data kelas';
        this.loading = false;
      }
    });
  }

  loadAssignments() {
    // Ambil semua assignment dari semua course (sederhana, bisa dioptimasi)
    this.assignments = [];
    this.courses.forEach(course => {
      this.assignmentService.getByCourse(course.id).subscribe({
        next: (data) => {
          this.assignments.push(...data);
          this.upcomingAssignments = this.assignments.filter(a => new Date(a.due_date) > new Date()).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()).slice(0, 3);
        }
      });
    });
  }

  goToCourse(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }

  enroll(course: Course) {
    this.courseService.enroll(course.id).subscribe({
      next: () => {
        alert('Berhasil enroll ke kelas!');
        this.loadCourses();
      },
      error: () => {
        alert('Gagal enroll ke kelas.');
      }
    });
  }
} 