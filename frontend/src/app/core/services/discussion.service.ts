import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Discussion {
  id: string;
  course: string;
  author: string;
  author_username: string;
  message: string;
  replied_to?: string;
  created_at: string;
  replies: Discussion[];
}

@Injectable({ providedIn: 'root' })
export class DiscussionService {
  private apiUrl = environment.apiUrl + '/discussions/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByCourse(courseId: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(this.apiUrl + '?course_id=' + courseId, { headers: this.getHeaders() });
  }

  create(discussion: Partial<Discussion>): Observable<Discussion> {
    return this.http.post<Discussion>(this.apiUrl, discussion, { headers: this.getHeaders() });
  }

  reply(parentId: string, message: string): Observable<Discussion> {
    return this.http.post<Discussion>(this.apiUrl + parentId + '/reply/', { message }, { headers: this.getHeaders() });
  }
} 