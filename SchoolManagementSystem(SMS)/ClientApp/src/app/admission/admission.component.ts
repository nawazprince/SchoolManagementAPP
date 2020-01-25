import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import { Data } from '@angular/router';
declare var $: any;
@Component({
    selector: 'app-admission',
    templateUrl: './admission.component.html'
})
export class AdmissionComponent {

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
        this.LoadList();
        //this.LoadDropdownList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }
    public LoadList() {
        this.Http.get<Admission[]>(this.BaseUrl + 'api/Admissions').subscribe(result => {
            this.AdmissionList = result;
        }, error => this.Toastr.errorToastr(error, "error LoadList"));
       
    }

    public Cancel(form: NgForm) {
        
        this.Admission = new Admission();
       
    }
  
    public SubmitAdmission(form: NgForm) {

        if (this.Admission.studentId == 0) {
            this.Http.post<Admission>(this.BaseUrl + 'api/Admissions', this.Admission)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#AdmissionModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error Submit post"));
        }
        else {
            this.Http.put<Admission>(this.BaseUrl + 'api/Admissions/' + this.Admission.studentId, this.Admission)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#AdmissionModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error submit put"));
        }

    }

    public GetAdmission(id: number) {

        this.Http.get<Admission>(this.BaseUrl + 'api/Admissions/' + id)
            .subscribe(result => {
                this.Admission = result;
                $('#AdmissionModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error Get"));
    }
    public DeleteConfirmation(s: Admission) {

        this.Admission = s;
        $('#deleteModal').modal('show');

    }
    public DeleteAdmission(id: number) {





        this.Http.delete<Admission>(this.BaseUrl + 'api/Admissions/' + id)
            .subscribe(result => {
                this.Admission = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => this.Toastr.errorToastr(error, "error delete"));

    }
}


class Admission {




    public studentId: number = 0;
    public studentName: string=null;
    public fatherName: string=null;
    public motherName: string=null;
    public dob: Date = new Date();
    //public gender: string;
    //public bloodGroup: BloodGroupEnum;
    //public bloodGroupText: string;
    public nationality: string;
    public brithcertificateNumber: string;
    public relegion: string;
   
    public presentAddress: string;

    public permanentAddress: string;

    public gurdianName: string;

    public gurdianContact: string;
    //public ImagePath: string = '';
    //public Image: File;

}


