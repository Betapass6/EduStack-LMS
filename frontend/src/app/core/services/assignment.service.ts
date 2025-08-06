import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Assignment {
  id: string;
  course: string;
  title: string;
  instructions: string;
  due_date: string;
  attachment?: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private apiUrl = environment.apiUrl + '/assignments/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByCourse(courseId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(environment.apiUrl + `/courses/${courseId}/assignments/`, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<Assignment> {
    return this.http.get<Assignment>(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }

  create(assignment: any): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment, { headers: this.getHeaders() });
  }

  update(id: string, assignment: any): Observable<Assignment> {
    return this.http.put<Assignment>(this.apiUrl + id + '/', assignment, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }
} 