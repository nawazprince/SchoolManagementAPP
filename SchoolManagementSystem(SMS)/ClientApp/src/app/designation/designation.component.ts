import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';


declare var $: any;



@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html'
})

export class DesignationComponent {

    public DesignationList: Designation[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Designation: Designation;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }

    public LoadList() {

        this.Http.get<Designation[]>(this.BaseUrl + 'api/Designations')
            .subscribe(result => {
                this.DesignationList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel(null);
    }


    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Designation = new Designation();
    }



    public SubmitDesignation(form: NgForm) {
        if (this.Designation.designationId == 0)
        {
            this.CreateDesignation(form);
        }
        else {
            this.UpdateDesignation(form);
        }
    }

    CreateDesignation(form: NgForm) {

        
        this.Http.post<Designation>(this.BaseUrl + 'api/Designations', this.Designation
        )
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#designationModal').modal('hide');
                this.Toastr.successToastr(result.designationName + ' create successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    UpdateDesignation(form: NgForm) {


        this.Http.put(this.BaseUrl + 'api/Designations/' + this.Designation.designationId, this.Designation)
            .subscribe(result => {
                let name = this.Designation.designationName;
                this.LoadList();
                this.Cancel(form);
                $('#designationModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public GetDesignation(id: number) {

        this.Http.get<Designation>(this.BaseUrl + 'api/Designations/' + id)
            .subscribe(result => {
                this.Designation = result;
                $('#designationModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(d: Designation) {

        this.Designation = d;
        $('#deleteModal').modal('show');

    }
    public DeleteDesignation(id: number) {

        this.Http.delete<Designation>(this.BaseUrl + 'api/Designations/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.designationName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Designation {
    public designationId: number = 0;
    public designationName: string = '';
}
