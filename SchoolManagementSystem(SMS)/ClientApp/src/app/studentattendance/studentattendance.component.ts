import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-studentattendance',
    templateUrl: './studentattendance.component.html'
})
export class StudentAttendanceComponent {



    public ShiftList: Shift[];
    public ClassList: Class[];
    public SectionList: Section[];

    public Shift: number = 0;
    public Class: number = 0;
    public Section: number = 0;

    public AttendanceDate: Date = new Date();

    public StudentAttendanceList: StudentAttendance[];

    public Http: HttpClient;
    public BaseUrl: string;

    public StudentAttendance: StudentAttendance;





    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.Http = http;
        this.BaseUrl = baseUrl ;

        this.LoadData();
    }

    LoadData() {
        this.LoadShiftList();
        this.LoadClassList();
        this.LoadSectionList();
        this.LoadStudentList();
    }

    ChangeClass() {
        this.LoadSectionList();
        this.LoadStudentList();
    }
    public LoadStudentList() {

        this.Http.get<StudentAttendance[]>(this.BaseUrl + `api/StudentAttendances/${this.Shift}/${this.Class}/${this.Section}`)
            .subscribe(result => {
                this.StudentAttendanceList = result;
            }, error => console.error(error));

    }
    public LoadShiftList() {

        this.Http.get<Shift[]>(this.BaseUrl +'api/StudentShiftInfoes')
            .subscribe(result => {
                this.ShiftList = result;
            }, error => console.error(error));

    }
    
    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl +'api/Classes')
            .subscribe(result => {
                this.ClassList = result;
            }, error => console.error(error));

    }

    public LoadSectionList() {

        if (this.Class == 0)
            this.Http.get<Section[]>(this.BaseUrl + 'api/StudentSectionInfoes')
                .subscribe(result => {
                    this.SectionList = result;
                }, error => console.error(error));
        else {
            this.Http.get<Section[]>(this.BaseUrl + 'api/StudentSectionInfoes/GetSectionByClass/' + this.Class)
                .subscribe(result => {
                    this.SectionList = result;
                }, error => console.error(error));
        }
    }

    public Cancel() {

        this.LoadShiftList();
        this.LoadClassList();
        this.LoadSectionList();
        
    }
    public SubmitAttendace(form:NgForm) {

        let formdata = form;



        //if (this.StudentAttendance.AttendanceId == 0) {
        //    this.Http.post<StudentAttendance>(this.BaseUrl, this.StudentAttendance)
        //        .subscribe(result => {

        //            this.LoadShiftList();
        //            this.LoadClassList();
        //            this.LoadSectionList();
        //            this.LoadStudentList();
        //        }, error => console.error(error));
        //}        
    }
}



interface Shift {
    Id: number;
    ShiftName: string;
}
interface Class {
    classId: number;
    className: string;
}
interface Section {
    sectionId: number;
   sectionName: string;
}


class StudentAttendance {

    public AttendanceId: number;
    public AttendanceDate: Date = new Date();
    public StudentId: number = 0;
    public StudentName: string;
    public Class: string;
    public Section: string;
    public Shift: string;
    public IsPresent: boolean=true;
}
