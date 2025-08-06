import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './modules/student/dashboard/dashboard.component';
import { StudentAssignmentListComponent } from './modules/student/student-assignment-list/student-assignment-list.component';
import { StudentSubmissionFormComponent } from './modules/student/student-submission-form/student-submission-form.component';
import { TeacherAssignmentFormComponent } from './modules/teacher/teacher-assignment-form/teacher-assignment-form.component';
import { TeacherAssignmentListComponent } from './modules/teacher/teacher-assignment-list/teacher-assignment-list.component';
import { TeacherSubmissionListComponent } from './modules/teacher/teacher-submission-list/teacher-submission-list.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { CourseListComponent } from './modules/student/course-list/course-list.component';
import { CourseDetailComponent } from './modules/student/course-detail/course-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { DiscussionListComponent } from './modules/student/discussion-list/discussion-list.component';
import { GradeReportComponent } from './modules/student/grade-report/grade-report.component';
import { MatTableModule } from '@angular/material/table';
import { DiscussionItemComponent } from './modules/student/discussion-item/discussion-item.component';
import { TeacherCourseFormComponent } from './modules/teacher/teacher-course-form/teacher-course-form.component';
import { TeacherCourseListComponent } from './modules/teacher/teacher-course-list/teacher-course-list.component';
import { TeacherGradeReportComponent } from './modules/teacher/teacher-grade-report/teacher-grade-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentAssignmentListComponent,
    StudentSubmissionFormComponent,
    TeacherAssignmentFormComponent,
    TeacherAssignmentListComponent,
    TeacherSubmissionListComponent,
    LoginComponent,
    RegisterComponent,
    CourseListComponent,
    CourseDetailComponent,
    DiscussionListComponent,
    GradeReportComponent,
    DiscussionItemComponent,
    TeacherCourseFormComponent,
    TeacherCourseListComponent,
    TeacherGradeReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {} 