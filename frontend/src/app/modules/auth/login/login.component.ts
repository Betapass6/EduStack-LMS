import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router, private notification: NotificationService) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.notification.show('Username dan password wajib diisi!');
      return;
    }
    this.loading = true;
    this.error = '';
    
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        this.auth.saveToken(data.access, { username: this.username, role: data.role });
        this.loading = false;
        this.notification.show('Login berhasil!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Login gagal. Cek username/password.';
        this.loading = false;
        this.notification.show('Login gagal. Cek username/password.');
      }
    });
  }
} 