import { Component, OnInit } from '@angular/core';
import { QuizService, Quiz } from 'src/app/core/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = true;
  error = '';
  courseId: string | null = null;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.quizService.getByCourse(this.courseId).subscribe({
        next: (data) => {
          this.quizzes = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Gagal memuat quiz';
          this.loading = false;
        }
      });
    }
  }

  goToQuiz(quiz: Quiz) {
    this.router.navigate(['/student/courses', this.courseId, 'quizzes', quiz.id]);
  }
} 