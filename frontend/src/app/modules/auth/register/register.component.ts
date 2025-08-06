import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  password2 = '';
  role = 'siswa';
  error = '';
  loading = false;
  roles = [
    { value: 'siswa', label: 'Siswa' },
    { value: 'guru', label: 'Guru' }
  ];

  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private notification: NotificationService) {}

  onSubmit() {
    if (!this.username || !this.email || !this.password || !this.password2 || !this.role) {
      this.notification.show('Semua field wajib diisi!');
      return;
    }

    if (this.password !== this.password2) {
      this.error = 'Password tidak cocok!';
      this.notification.show('Password tidak cocok!');
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post<any>(environment.apiUrl + '/register/', {
      username: this.username,
      email: this.email,
      password: this.password,
      password2: this.password2,
      role: this.role
    }).subscribe({
      next: (data) => {
        this.loading = false;
        this.notification.show('Registrasi berhasil! Silakan login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Registrasi gagal. Cek data Anda.';
        this.loading = false;
        this.notification.show('Registrasi gagal. Cek data Anda.');
      }
    });
  }
} 