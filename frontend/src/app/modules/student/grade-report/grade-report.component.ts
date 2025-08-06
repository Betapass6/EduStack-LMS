import { Component, OnInit } from '@angular/core';
import { GradeReportService } from 'src/app/core/services/grade-report.service';

@Component({
  selector: 'app-grade-report',
  templateUrl: './grade-report.component.html',
})
export class GradeReportComponent implements OnInit {
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
        this.error = 'Gagal memuat laporan nilai';
        this.loading = false;
      }
    });
  }
} 