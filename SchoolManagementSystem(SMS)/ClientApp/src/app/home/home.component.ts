import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import { Data } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {

    public AdmissionList: Admission[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Admission: Admission;



    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Admission = new Admission();
        this.Toastr = toastr;        
    }


    public SubmitAdmission(form: NgForm) {
            this.Http.post<Admission>(this.BaseUrl + 'api/Admissions', this.Admission)
                .subscribe(result => {
                    //form.reset();
                    $('#AdmissionModal').modal('hide');
                    this.Toastr.successToastr(' Data Submitted successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error Submit post"));       

    }
    public Cancel(form: NgForm) {

        this.Admission = new Admission();

    }
}
class Admission {
    public studentId: number = 0;
    public studentName: string = null;
    public fatherName: string = null;
    public motherName: string = null;
    public gender: string = null;
    public dob: Date = new Date();
    public nationality: string;
    public brithcertificateNumber: string;
    public relegion: string;
    public admissionDate: Date = new Date();
    public presentAddress: string;

    public permanentAddress: string;

    public gurdianName: string;

    public gurdianContact: string;

}
