import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService, Quiz } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quiz?: Quiz;
  loading = true;
  error = '';
  answers: { [questionId: string]: string } = {};
  timeLeft = 0;
  timerInterval: any;
  submitted = false;
  score?: number;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    if (quizId) {
      this.quizService.getById(quizId).subscribe({
        next: (data) => {
          this.quiz = data;
          this.loading = false;
          this.timeLeft = (data.duration_minutes || 30) * 60;
          this.startTimer();
        },
        error: () => {
          this.error = 'Gagal memuat quiz';
          this.loading = false;
        }
      });
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.submitQuiz();
      }
    }, 1000);
  }

  submitQuiz() {
    if (this.submitted || !this.quiz) return;
    clearInterval(this.timerInterval);
    this.quizService.submitQuiz(this.quiz.id, this.answers).subscribe({
      next: (result) => {
        this.submitted = true;
        this.score = result.score;
      },
      error: () => {
        this.error = 'Gagal submit quiz';
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
} 