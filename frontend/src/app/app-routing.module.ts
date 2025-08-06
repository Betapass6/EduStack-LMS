import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/student/dashboard/dashboard.component';
import { CourseListComponent } from './modules/student/course-list/course-list.component';
import { CourseDetailComponent } from './modules/student/course-detail/course-detail.component';
import { StudentAssignmentListComponent } from './modules/student/student-assignment-list/student-assignment-list.component';
import { StudentSubmissionFormComponent } from './modules/student/student-submission-form/student-submission-form.component';
import { DiscussionListComponent } from './modules/student/discussion-list/discussion-list.component';
import { GradeReportComponent } from './modules/student/grade-report/grade-report.component';
import { TeacherCourseListComponent } from './modules/teacher/teacher-course-list/teacher-course-list.component';
import { TeacherCourseFormComponent } from './modules/teacher/teacher-course-form/teacher-course-form.component';
import { TeacherAssignmentListComponent } from './modules/teacher/teacher-assignment-list/teacher-assignment-list.component';
import { TeacherAssignmentFormComponent } from './modules/teacher/teacher-assignment-form/teacher-assignment-form.component';
import { TeacherSubmissionListComponent } from './modules/teacher/teacher-submission-list/teacher-submission-list.component';
import { TeacherGradeReportComponent } from './modules/teacher/teacher-grade-report/teacher-grade-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  // Student routes
  { 
    path: 'courses', 
    component: CourseListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  { 
    path: 'courses/:id', 
    component: CourseDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  { 
    path: 'assignments', 
    component: StudentAssignmentListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  { 
    path: 'submissions', 
    component: StudentSubmissionFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  { 
    path: 'discussions', 
    component: DiscussionListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  { 
    path: 'grades', 
    component: GradeReportComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['siswa'] }
  },
  
  // Teacher routes
  { 
    path: 'teacher/courses', 
    component: TeacherCourseListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  { 
    path: 'teacher/courses/new', 
    component: TeacherCourseFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  { 
    path: 'teacher/assignments', 
    component: TeacherAssignmentListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  { 
    path: 'teacher/assignments/new', 
    component: TeacherAssignmentFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  { 
    path: 'teacher/submissions', 
    component: TeacherSubmissionListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  { 
    path: 'teacher/grades', 
    component: TeacherGradeReportComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['guru'] }
  },
  
  // Catch all route
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 