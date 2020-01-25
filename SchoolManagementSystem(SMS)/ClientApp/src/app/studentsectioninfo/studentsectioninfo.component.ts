import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-studentsectioninfo',
    templateUrl: './studentsectioninfo.component.html'
})
export class StudentSectionInfoComponent {
    public StudentSectionInfoList: StudentSectionInfo[];
    public ClassList: Class[];
    //public StudentShiftInfoList: StudentShiftInfo[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public StudentSectionInfo: StudentSectionInfo;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<StudentSectionInfo[]>(this.BaseUrl + 'api/StudentSectionInfoes').subscribe(result => {
            this.StudentSectionInfoList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
        this.LoadClassList();
        //this.LoadShiftList();
    }

    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
            .subscribe(result => {
                this.ClassList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    //public LoadShiftList() {

    //    this.Http.get<StudentShiftInfo[]>(this.BaseUrl + 'api/StudentShiftInfoes')
    //        .subscribe(result => {
    //            this.StudentShiftInfoList = result;
    //        }, error => this.Toastr.errorToastr(error, "Error"));
    //    this.Cancel();
    //}
    public Cancel() {

        this.StudentSectionInfo = new StudentSectionInfo();
    }

    public SubmitStudentSectionInfo(form: NgForm) {

        if (this.StudentSectionInfo.sectionId == 0) {
            this.Http.post<StudentSectionInfo>(this.BaseUrl + 'api/StudentSectionInfoes', this.StudentSectionInfo)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#sectionModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }
        else {
            this.Http.put<StudentSectionInfo>(this.BaseUrl + 'api/StudentSectionInfoes/' + this.StudentSectionInfo.sectionId, this.StudentSectionInfo)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#sectionModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetStudentSectionInfo(id: number) {

        this.Http.get<StudentSectionInfo>(this.BaseUrl + 'api/StudentSectionInfoes/' + id)
            .subscribe(result => {
                this.StudentSectionInfo = result;
                $('#sectionModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(e: StudentSectionInfo) {

        this.StudentSectionInfo = e;
        $('#deleteModal').modal('show');

    }
    public DeleteStudentSectionInfo(id: number) {

        this.Http.delete<StudentSectionInfo>(this.BaseUrl + 'api/StudentSectionInfoes/' + id)
            .subscribe(result => {
                this.StudentSectionInfo = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}


class StudentSectionInfo {
    public sectionId: number = 0;
    public sectionName: string;
    public classId: number;
    public class: string;
  
}

interface Class {
    classId: number;
    className: string;


}
