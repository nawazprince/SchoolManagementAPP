import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import { Data } from '@angular/router';
declare var $: any;
@Component({
    selector: 'app-school',
    templateUrl: './school.component.html'
})
export class SchoolComponent {

    public SchoolList: School[];

 

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public School: School;
   


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;

        this.School = new School();

        this.Toastr = toastr;
        this.LoadList();
      
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }
    public LoadList() {
        this.Http.get<School[]>(this.BaseUrl + 'api/Schools').subscribe(result => {
            this.SchoolList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
       
        
    }


    public Cancel(form: NgForm) {

        this.School = new School();
 
    }

    public SubmitSchool(form: NgForm) {


      
        if (this.School.schoolId == 0) {
            this.Http.post<School>(this.BaseUrl + 'api/Schools', this.School)
                .subscribe(result => {
                    this.LoadList();
                    $('#SchoolModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "error SubmitSchool post"));
        }
        else {
            this.Http.put(this.BaseUrl + 'api/Schools/' + this.School.schoolId, this.School)
                .subscribe(result => {
                    this.LoadList();
                    $('#SchoolModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "error SubmitSchool put"));
        }

    }

    public GetSchool(id: number) {

        this.Http.get<School>(this.BaseUrl + 'api/Schools/' + id)
            .subscribe(result => {
                this.School = result;
                $('#SchoolModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));
    }
    public DeleteConfirmation(s: School) {

        this.School = s;
        $('#deleteModal').modal('show');

    }
    public DeleteSchool(id: number) {





        this.Http.delete<School>(this.BaseUrl + 'api/Schools/' + id)
            .subscribe(result => {
                this.School = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}


class School {




    public schoolId: number = 0;
    public schoolAddress: string=null;
    public registrationNo: string=null;
  
}



