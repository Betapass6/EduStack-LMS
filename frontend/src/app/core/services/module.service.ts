import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Module {
  id: string;
  title: string;
  order: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private apiUrl = environment.apiUrl + '/modules/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByCourse(courseId: string): Observable<Module[]> {
    return this.http.get<Module[]>(environment.apiUrl + `/courses/${courseId}/modules/`, { headers: this.getHeaders() });
  }

  create(courseId: string, module: Partial<Module>): Observable<Module> {
    return this.http.post<Module>(environment.apiUrl + `/courses/${courseId}/modules/`, module, { headers: this.getHeaders() });
  }

  update(moduleId: string, module: Partial<Module>): Observable<Module> {
    return this.http.put<Module>(this.apiUrl + moduleId + '/', module, { headers: this.getHeaders() });
  }

  delete(moduleId: string): Observable<any> {
    return this.http.delete(this.apiUrl + moduleId + '/', { headers: this.getHeaders() });
  }
} 