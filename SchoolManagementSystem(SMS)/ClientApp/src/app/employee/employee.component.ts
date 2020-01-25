import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import { Data } from '@angular/router';


declare var $: any;



@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})

export class EmployeeComponent {

    public EmployeeList: Employees[];
    public DesignationList: Designation[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Employees: Employees;
    public photoPreview: string | ArrayBuffer;

    genders: string[] = ['Male', 'Female'];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }

    public LoadList() {

        this.Http.get<Employees[]>(this.BaseUrl + 'api/Employees')
            .subscribe(result => {

                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadList"));
        this.Cancel(null);
        this.LoadDesignationList();
    }

    public LoadDesignationList() {

        this.Http.get<Designation[]>(this.BaseUrl + 'api/Designations')
            .subscribe(result => {
                this.DesignationList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadDesignationList"));
    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Employees = new Employees();
        this.photoPreview = null;
    }

    onFileChanged(event) {
        this.Employees.Image = event.target.files[0];
        this.preview();
    }


    preview() {
        // Show preview 
        var mimeType = this.Employees.Image.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.Employees.Image);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }

    public SubmitEmployee(form: NgForm) {

        const formData = new FormData();

        formData.append('employeeId', this.Employees.employeeId.toString());
        if (!isNullOrUndefined(this.Employees.designationId))
            formData.append('designationId', this.Employees.designationId.toString());
        formData.append('firstName', this.Employees.firstName);
        formData.append('lastName', this.Employees.lastName);
        formData.append('fullName', this.Employees.fullName);
        formData.append('gender', this.Employees.gender);
        if (!isNullOrUndefined(this.Employees.joiningDate))
            formData.append('joiningDate', this.Employees.joiningDate.toString());
        formData.append('address', this.Employees.address);
        formData.append('email', this.Employees.email);
        formData.append('contactNumber', this.Employees.contactNumber);

        formData.append('ImagePath', this.Employees.imagePath);
        if (!isNullOrUndefined(this.Employees.Image))
        formData.append('image', this.Employees.Image, this.Employees.Image.name);
        //formData.append('designation', this.Employees.designation);


        if (this.Employees.employeeId == 0) {
            this.CreateEmployee(form, formData);
        }
        else {
            this.UpdateEmployee(form, formData);
        }
    }

    CreateEmployee(form: NgForm, formData: FormData) {


        this.Http.post<Employees>(this.BaseUrl + 'api/Employees', formData
        )
            .subscribe(result => {
                if (isNullOrUndefined(result)) return;
                this.LoadList();
                this.Cancel(form);
                $('#employeeModal').modal('hide');
                this.Toastr.successToastr('"' + result.fullName + '"' + ' create successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    UpdateEmployee(form: NgForm, formData: FormData) {
        this.Http.put(this.BaseUrl + 'api/Employees/' + this.Employees.employeeId, formData)
            .subscribe(result => {
                let name = this.Employees.fullName;
                this.LoadList();
                this.Cancel(form);
                $('#employeeModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public GetEmployee(id: number) {

        this.Http.get<Employees>(this.BaseUrl + 'api/Employees/' + id)
            .subscribe(result => {

                this.Employees = result;
                this.Employees.joiningDate = new Date(this.Employees.joiningDate);

                $('#employeeModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(e: Employees) {

        this.Employees = e;
        $('#deleteModal').modal('show');

    }
    public DeleteEmployee(id: number) {

        this.Http.delete<Employees>(this.BaseUrl + 'api/Employees/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.fullName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }


}

class Employees {
    constructor() {

        this.employeeId = 0;
        this.fullName = this.firstName + ' ' + this.lastName;
    }
    public employeeId: number = 0;
    public designationId: number;
    public designation: string;
    public firstName: string = '';
    public lastName: string = '';
    public fullName: string = '';
    public gender: string = '';
    public joiningDate: Date = new Date();
    public address: string = '';
    public contactNumber: string = '';
    public email: string = '';
    public imagePath: string = '';
    public Image: File;
}
interface Designation {
    designationId: number;
    designationName: string

}
