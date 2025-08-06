import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeReportComponent } from './grade-report.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GradeReportService } from 'src/app/core/services/grade-report.service';
import { of } from 'rxjs';

describe('GradeReportComponent', () => {
  let component: GradeReportComponent;
  let fixture: ComponentFixture<GradeReportComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = { getReport: () => of({ assignment_avg: 90, quiz_avg: 80, assignments: [], quizzes: [] }) };
    await TestBed.configureTestingModule({
      declarations: [GradeReportComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: GradeReportService, useValue: mockService }]
    }).compileComponents();
    fixture = TestBed.createComponent(GradeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load report data', () => {
    expect(component.report.assignment_avg).toBe(90);
    expect(component.report.quiz_avg).toBe(80);
  });
}); 