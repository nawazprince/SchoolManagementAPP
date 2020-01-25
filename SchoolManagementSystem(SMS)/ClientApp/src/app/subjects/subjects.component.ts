import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html'
})
export class SubjectComponent {
    public SubjectList: Subject[];
    public ClassList: Class[];
    public GroupList: Group[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Subject: Subject;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Subject[]>(this.BaseUrl + 'api/Subjects').subscribe(result => {
            this.SubjectList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
        this.LoadClassList();
        this.LoadGroupList();
    }

    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
        .subscribe(result => {
            this.ClassList = result;
        }, error => this.Toastr.errorToastr(error, "Error"));
      this.Cancel();
    }
    public LoadGroupList() {

        this.Http.get<Group[]>(this.BaseUrl + 'api/Groups')
            .subscribe(result => {
                this.GroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Subject = new Subject();
    }

    public SubmitSubject(form: NgForm) {

        if (this.Subject.subjectId == 0) {
            this.Http.post<Subject>(this.BaseUrl + 'api/Subjects', this.Subject)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    this.Cancel();
                    $('#SubjectModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error SubmitSubject"));
        }
        else {
            this.Http.put<Subject>(this.BaseUrl + 'api/Subjects/' + this.Subject.subjectId, this.Subject)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    this.Cancel();
                    $('#SubjectModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitSubject put"));
        }

    }




    public GetSubject(id: number) {

        this.Http.get<Subject>(this.BaseUrl + 'api/Subjects/' + id)
            .subscribe(result => {
                this.Subject = result;
                $('#SubjectModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error GetSubject"));

    }

    public DeleteConfirmation(e: Subject) {

        this.Subject = e;
        $('#deleteModal').modal('show');

    }
    public DeleteSubject(id: number) {

        this.Http.delete<Subject>(this.BaseUrl + 'api/Subjects/' + id)
            .subscribe(result => {
                this.Subject = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Subject {
    subjectId: number = 0;
    classId: number;
    groupId: number;
    subjectCode: string = null;
    subjectName: string = null;
    mcqMarks: number=0;
    writtenMarks: number=0;
    practicalMarks: number=0;
    ctMarks: number=0;
    totalMarks: number=0;
    passMarks: number = 40;
   
     classError: string;

  
 
}
interface Class {
    classId: number;
    className: string;
 

}
interface Group {
    groupId: number;
    groupName: string;


}
