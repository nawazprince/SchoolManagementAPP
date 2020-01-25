import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-studentdetailsinfo',
    templateUrl: './studentdetailsinfo.component.html'
})
export class StudentDetailsInfoComponent {
    public StudentDetailsInfoList: StudentDetailsInfo[];
    public StudentShiftInfoList: StudentShiftInfo[];
    public ClassList: Class[];
    public StudentSectionInfoList: StudentSectionInfo[];
    public GroupList: Group[];
    public AdmissionList: Admission[];

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public StudentDetailsInfo: StudentDetailsInfo;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;

        this.StudentDetailsInfo = new StudentDetailsInfo();
        this.Toastr = toastr;
        this.LoadList();
        this.LoadAdmissionList();
        this.LoadClassList();
        this.LoadShiftList();
        this.LoadSectionList();
        this.LoadGroupList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {

        this.Http.get<StudentDetailsInfo[]>(this.BaseUrl + 'api/StudentDetailsInfoes')
            .subscribe(result => {
                this.StudentDetailsInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadList"));

    }
    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
            .subscribe(result => {
                this.ClassList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadClassList"));
        this.Cancel();
    }
    public LoadGroupList() {

        this.Http.get<Group[]>(this.BaseUrl + 'api/Groups')
            .subscribe(result => {
                this.GroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadGroupList"));
        this.Cancel();
    }
    public LoadAdmissionList() {

        this.Http.get<Admission[]>(this.BaseUrl + 'api/Admissions')
            .subscribe(result => {
                this.AdmissionList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadStudentList"));
        this.Cancel();
    }
    public LoadShiftList() {

        this.Http.get<StudentShiftInfo[]>(this.BaseUrl + 'api/StudentShiftInfoes')
            .subscribe(result => {
                this.StudentShiftInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadShiftList"));
        this.Cancel();
    }
    public LoadSectionList() {

        this.Http.get<StudentSectionInfo[]>(this.BaseUrl + 'api/StudentSectionInfoes')
            .subscribe(result => {
                this.StudentSectionInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadSectionList"));
        this.Cancel();
    }

    public Cancel() {

        this.StudentDetailsInfo = new StudentDetailsInfo();
    }
    public SubmitStudentDetailsInfo() {

        if (this.StudentDetailsInfo.studentDetailsId == 0) {
            this.Http.post<StudentDetailsInfo>(this.BaseUrl + 'api/StudentDetailsInfoes', this.StudentDetailsInfo)
                .subscribe(result => {
                    this.LoadList();
                    $('#studentDetailsInfoModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "Error SubmitStudentDetailsInfo"));
        }
        else {
            this.Http.put<StudentDetailsInfo>(this.BaseUrl + + 'api/StudentDetailsInfoes/' + this.StudentDetailsInfo.studentDetailsId, this.StudentDetailsInfo)
                .subscribe(result => {
                    this.LoadList();
                    $('#studentDetailsInfoModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "Error SubmitStudentDetailsInfo else"));
        }
    }

    public GetStudentDetailsInfo(Id: number) {

        this.Http.get<StudentDetailsInfo>(this.BaseUrl + 'api/StudentDetailsInfoes/' + Id)
            .subscribe(result => {
                this.StudentDetailsInfo = result;
                $('#studentDetailsInfoModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error GetStudentDetailsInfo"));
    }
    public DeleteConfirmation(s: StudentDetailsInfo) {

        this.StudentDetailsInfo = s;
        $('#deleteModal').modal('show');

    }
    public DeleteStudentInfo(Id: number) {


        this.Http.delete<StudentDetailsInfo>(this.BaseUrl + 'api/StudentDetailsInfoes/' + Id)
            .subscribe(result => {
                this.StudentDetailsInfo = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => this.Toastr.errorToastr(error, "Error DeleteStudentInfo"));

    }


}



class StudentDetailsInfo {

    public studentDetailsId: number = 0;
    public studentId: number = 0;
    public shiftId: number = 0;
    public rollNo: number = 0;
    public classId: number = 0;
    public groupId: number = 0;
    public sectionId: number = 0;
    public admissionDate: Date;


}
interface StudentShiftInfo {
    shiftId: number;
    shiftName: string;
}
interface Class {
    classId: number;
    className: string;
}
interface StudentSectionInfo {
    sectionId: number;
    sectionName: string;
}
interface Admission {
    studentId: number;
    studentName: string;
    fatherName: string;
    motherName: string;
    dob: string;
    gender: string;
    nationality: string;
    brithcertificateNumber: string;
    relegion: string;
    presentAddress: string;
    permanentAddress: string;
    gurdianName: string;
    gurdianContact: string;
}
interface Group {
    groupId: number;
    groupName: string;
}

