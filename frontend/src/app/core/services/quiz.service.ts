import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface QuizQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer?: string;
}

export interface Quiz {
  id: string;
  course: string;
  title: string;
  description: string;
  duration_minutes: number;
  created_at: string;
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  id: string;
  quiz: string;
  student: string;
  answers: { [questionId: string]: string };
  score: number;
  submitted_at: string;
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = environment.apiUrl + '/quizzes/';
  private submissionUrl = environment.apiUrl + '/quizsubmissions/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByCourse(courseId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + '?course=' + courseId, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiUrl + id + '/', { headers: this.getHeaders() });
  }

  submitQuiz(quiz: string, answers: { [questionId: string]: string }): Observable<QuizSubmission> {
    return this.http.post<QuizSubmission>(this.submissionUrl + 'submit_quiz/', { quiz, answers }, { headers: this.getHeaders() });
  }

  getSubmissionByQuiz(quiz: string): Observable<QuizSubmission[]> {
    return this.http.get<QuizSubmission[]>(this.submissionUrl + '?quiz=' + quiz, { headers: this.getHeaders() });
  }
} 