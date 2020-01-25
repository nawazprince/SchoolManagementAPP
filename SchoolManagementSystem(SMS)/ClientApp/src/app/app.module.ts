import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
//import { NgxPrintModule } from 'ngx-print';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { StudentInfoComponent } from './studentInfo/studentinfo.component';
import { StudentShiftInfoComponent } from './studentshiftinfo/studentshiftinfo.component';
import { StudentDetailsInfoComponent } from './studentdetailsinfo/studentdetailsinfo.component';
import { StudentAttendanceComponent } from './studentattendance/studentattendance.component';
import { ClassComponent } from './class/class.component';
import { GroupComponent } from './group/group.component';
import { SubjectComponent } from './subjects/subjects.component';
import { ExamComponent } from './exam/exam.component';
import { TermComponent } from './term/term.component';
import { ExamYearComponent } from './examyear/examyear.component';
import { StudentSectionInfoComponent } from './studentsectioninfo/studentsectioninfo.component';
import { ResultComponent } from './result/result.component';
import { EmployeeComponent } from './employee/employee.component';
import { DesignationComponent } from './designation/designation.component';
//import { ResultSheetComponent } from './resultsheet/resultsheet.component';
import { SchoolComponent } from './school/school.component';
import { AdmissionComponent } from './admission/admission.component';
import { AboutUsComponent } from './aboutus/aboutus.component';




import { RoleComponent } from './role/role.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
        CounterComponent,
        RoleComponent,
        //BrowserAnimationsModule,
        //NgxPaginationModule,
        //NgxPrintModule,
        FetchDataComponent,
        StudentInfoComponent,
        StudentDetailsInfoComponent,
        StudentShiftInfoComponent,
        StudentAttendanceComponent,
        ClassComponent,
        GroupComponent,
        SubjectComponent,
        ExamComponent,
        TermComponent,
        ExamYearComponent,
        StudentSectionInfoComponent,
        ResultComponent,
        EmployeeComponent,
        DesignationComponent,
        SchoolComponent,
        AdmissionComponent,
        AboutUsComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
      ApiAuthorizationModule,
      BrowserAnimationsModule,
      MaterialModule,
      NgxPaginationModule,
      ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
        { path: 'role', component: RoleComponent },
        { path: 'studentinfo', component: StudentInfoComponent },
        { path: 'studentdetailsinfo', component: StudentDetailsInfoComponent },
        { path: 'studentshiftinfo', component: StudentShiftInfoComponent },
        { path: 'studentattendance', component: StudentAttendanceComponent },
        { path: 'class', component: ClassComponent },
        { path: 'group', component: GroupComponent },
        { path: 'subjects', component: SubjectComponent },
        { path: 'exam', component: ExamComponent },
        { path: 'term', component: TermComponent },
        { path: 'examyear', component: ExamYearComponent },
        { path: 'studentsectioninfo', component: StudentSectionInfoComponent },
        { path: 'result', component: ResultComponent },
        { path: 'employee', component: EmployeeComponent },
        { path: 'designation', component: DesignationComponent },
        //{ path: 'resultsheet', component: ResultSheetComponent },
        { path: 'school', component: SchoolComponent },
        { path: 'admission', component: AdmissionComponent },
        { path: 'aboutus', component: AboutUsComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
