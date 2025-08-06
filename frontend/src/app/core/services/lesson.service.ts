import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
  created_at: string;
  resource_file?: string;
}

@Injectable({ providedIn: 'root' })
export class LessonService {
  private apiUrl = environment.apiUrl + '/lessons/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByModule(moduleId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(environment.apiUrl + `/modules/${moduleId}/lessons/`, { headers: this.getHeaders() });
  }

  create(moduleId: string, lesson: Partial<Lesson>): Observable<Lesson> {
    return this.http.post<Lesson>(environment.apiUrl + `/modules/${moduleId}/lessons/`, lesson, { headers: this.getHeaders() });
  }

  update(lessonId: string, lesson: Partial<Lesson>): Observable<Lesson> {
    return this.http.put<Lesson>(this.apiUrl + lessonId + '/', lesson, { headers: this.getHeaders() });
  }

  delete(lessonId: string): Observable<any> {
    return this.http.delete(this.apiUrl + lessonId + '/', { headers: this.getHeaders() });
  }
} 