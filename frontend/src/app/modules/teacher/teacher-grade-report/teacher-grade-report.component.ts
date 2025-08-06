import { Component, OnInit } from '@angular/core';
import { GradeReportService } from 'src/app/core/services/grade-report.service';

@Component({
  selector: 'app-teacher-grade-report',
  templateUrl: './teacher-grade-report.component.html',
})
export class TeacherGradeReportComponent implements OnInit {
  report: any;
  loading = true;
  error = '';

  constructor(private gradeReportService: GradeReportService) {}

  ngOnInit(): void {
    this.gradeReportService.getReport().subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Gagal memuat rekap nilai';
        this.loading = false;
      }
    });
  }
} 