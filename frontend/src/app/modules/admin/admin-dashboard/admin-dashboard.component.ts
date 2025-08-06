import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from 'src/app/core/services/admin-stats.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: any;
  loading = true;
  error = '';

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit(): void {
    this.adminStatsService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        setTimeout(() => this.initChart(), 0);
      },
      error: () => {
        this.error = 'Gagal memuat statistik admin';
        this.loading = false;
      }
    });
  }

  initChart() {
    if (!this.stats) return;
    const ctx = document.getElementById('adminStatsChart') as HTMLCanvasElement;
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['User', 'Kelas', 'Assignment', 'Quiz'],
        datasets: [{
          label: 'Jumlah',
          data: [
            this.stats.user_count,
            this.stats.course_count,
            this.stats.assignment_count,
            this.stats.quiz_count
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
} 