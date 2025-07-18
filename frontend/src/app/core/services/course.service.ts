import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  thumbnail?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = environment.apiUrl + '/courses/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }

  create(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, { headers: this.getHeaders() });
  }

  update(id: string, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(this.apiUrl + id + '/', course, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }
} 