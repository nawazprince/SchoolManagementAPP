import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import { Data } from '@angular/router';
declare var $: any;
@Component({
    selector: 'app-studentinfo',
    templateUrl: './studentinfo.component.html'
})
export class StudentInfoComponent {

    public StudentInfoList: StudentInfo[];

    public BloodGroupList: string[] = Object.keys(BloodGroupEnum).filter(k => typeof BloodGroupEnum[k as any] === "number");

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public StudentInfo: StudentInfo;
    public photoPreview: string | ArrayBuffer;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;

        this.StudentInfo = new StudentInfo();

        this.Toastr = toastr;
        this.LoadList();
        //this.LoadDropdownList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }
    public LoadList() {
        let apiCon = `${this.BaseUrl}api/StudentInfoes`;
        this.Http.get<StudentInfo[]>(apiCon)
            .subscribe(result => {
                this.StudentInfoList = result;
            }, error => this.Toastr.errorToastr(error, "error LoadList"));
    }


    public Cancel(form: NgForm) {
        if (form != null)
            form.resetForm();


        this.StudentInfo = new StudentInfo();
        this.photoPreview = null;

    }


    onFileChanged(event) {
        this.StudentInfo.Image = event.target.files[0];
        this.preview();
    }


    preview() {
        // Show preview 
        var mimeType = this.StudentInfo.Image.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.StudentInfo.Image);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }

    public SubmitStudentInfo(form: NgForm) {

      

        const formData = new FormData();
        if (!isNullOrUndefined(this.StudentInfo.bloodGroup))
        this.StudentInfo.bloodGroup = BloodGroupEnum[this.StudentInfo.bloodGroup.toString()];
        if (!isNullOrUndefined(this.StudentInfo.studentId))
            formData.append('studentId', this.StudentInfo.studentId.toString());
        if (!isNullOrUndefined(this.StudentInfo.studentName))
            formData.append('studentName', this.StudentInfo.studentName);
        if (!isNullOrUndefined(this.StudentInfo.fatherName))
            formData.append('fatherName', this.StudentInfo.fatherName);
        if (!isNullOrUndefined(this.StudentInfo.motherName))
            formData.append('motherName', this.StudentInfo.motherName);
        if (!isNullOrUndefined(this.StudentInfo.gender))
            formData.append('gender', this.StudentInfo.gender);
        if (!isNullOrUndefined(this.StudentInfo.brithcertificateNumber))
        formData.append('brithcertificateNumber', this.StudentInfo.brithcertificateNumber);
        //formData.append('dob', this.StudentInfo.dob.toString());
        //formData.append('admissionDate', this.StudentInfo.admissionDate.toString());
        if (!isNullOrUndefined(this.StudentInfo.presentAddress))
            formData.append('presentAddress', this.StudentInfo.presentAddress);
        if (!isNullOrUndefined(this.StudentInfo.permanentAddress))
            formData.append('permanentAddress', this.StudentInfo.permanentAddress);
        if (!isNullOrUndefined(this.StudentInfo.gurdianName))
            formData.append('gurdianName', this.StudentInfo.gurdianName);
        if (!isNullOrUndefined(this.StudentInfo.relegion))
            formData.append('relegion', this.StudentInfo.relegion);
        if (!isNullOrUndefined(this.StudentInfo.nationality))
            formData.append('nationality', this.StudentInfo.nationality);
        if (!isNullOrUndefined(this.StudentInfo.cell))
            formData.append('cell', this.StudentInfo.cell);
        if (!isNullOrUndefined(this.StudentInfo.ImagePath))
            formData.append('ImagePath', this.StudentInfo.ImagePath);
        if (!isNullOrUndefined(this.StudentInfo.bloodGroup))
        formData.append('bloodGroup', this.StudentInfo.bloodGroup.toString());

        if (!isNullOrUndefined(this.StudentInfo.Image))
            formData.append('image', this.StudentInfo.Image, this.StudentInfo.Image.name);


        //this.StudentInfo.bloodGroup = Number(this.StudentInfo.bloodGroup);
        if (this.StudentInfo.studentId == 0) {
            this.Http.post<StudentInfo>(this.BaseUrl + 'api/StudentInfoes', formData)
                .subscribe(result => {
                    this.LoadList();
                    $('#studentInfoModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "error SubmitStudentInfo post"));
        }
        else {
            this.Http.put(this.BaseUrl + 'api/StudentInfoes/' + this.StudentInfo.studentId, formData)
                .subscribe(result => {
                    this.LoadList();
                    $('#studentInfoModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "error SubmitStudentInfo put"));
        }

    }

    public GetStudentInfo(id: number) {

        this.Http.get<StudentInfo>(this.BaseUrl + 'api/StudentInfoes/' + id)
            .subscribe(result => {
                this.StudentInfo = result;
                $('#studentInfoModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));
    }
    public DeleteConfirmation(s: StudentInfo) {

        this.StudentInfo = s;
        $('#deleteModal').modal('show');

    }
    public DeleteStudentInfo(id: number) {





        this.Http.delete<StudentInfo>(this.BaseUrl + 'api/StudentInfoes/' + id)
            .subscribe(result => {
                this.StudentInfo = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}


class StudentInfo {




    public studentId: number = 0;
    public studentName: string=null;
    public fatherName: string=null;
    public motherName: string=null;
    public dob: Date = new Date();
    public gender: string;
    public bloodGroup: BloodGroupEnum;
    public bloodGroupText: string;
    public nationality: string;
    public brithcertificateNumber: string;
    public relegion: string;
    //public admissionDate: Date = new Date();
    public presentAddress: string;

    public permanentAddress: string;

    public gurdianName: string;

    public cell: string;
    public ImagePath: string = '';
    public Image: File;

}



enum BloodGroupEnum {
    A_Positive,
    A_Negative,
    B_Positive,
    B_Negative,
    O_Positive,
    O_Negative,
    AB_Positive,
    AB_Negative
}
