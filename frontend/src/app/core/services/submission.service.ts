import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Submission {
  id: string;
  assignment: string;
  student: string;
  submission_file?: string;
  submitted_at: string;
  grade?: string;
  feedback?: string;
}

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private apiUrl = environment.apiUrl + '/submissions/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByAssignment(assignmentId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(environment.apiUrl + `/assignments/${assignmentId}/submissions/`, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<Submission> {
    return this.http.get<Submission>(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }

  submit(assignmentId: string, formData: FormData): Observable<Submission> {
    return this.http.post<Submission>(environment.apiUrl + `/assignments/${assignmentId}/submit/`, formData, { headers: this.getHeaders() });
  }

  grade(id: string, grade: string, feedback: string): Observable<Submission> {
    return this.http.put<Submission>(this.apiUrl + id + '/grade/', { grade, feedback }, { headers: this.getHeaders() });
  }
} 