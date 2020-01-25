import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
    selector: 'app-studentshiftinfo',
    templateUrl: './studentshiftinfo.component.html'
})

export class StudentShiftInfoComponent {

    public StudentShiftInfoList: StudentShiftInfo[];
    public Http: HttpClient;
    public BaseUrl: string;
    public StudentShiftInfo: StudentShiftInfo;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        this.Http = http;
        this.BaseUrl = baseUrl + 'api/StudentShiftInfoes';

        this.LoadList();

    }

    public LoadList() {

        this.Http.get<StudentShiftInfo[]>(this.BaseUrl)
            .subscribe(result => {
                this.StudentShiftInfoList = result;
            }, error => console.error(error));
        this.Cancel();
    }

    public Cancel() {

        this.StudentShiftInfo = new StudentShiftInfo();
    }

    public SubmitStudentShiftInfo() {

        if (this.StudentShiftInfo.shiftId == 0) {
            this.Http.post<StudentShiftInfo>(this.BaseUrl, this.StudentShiftInfo)
                .subscribe(result => {
                    //alert(result.shiftName + ' create successfully');
                    this.LoadList();
                    $('#studentShiftInfoModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<StudentShiftInfo>(this.BaseUrl + '/' + this.StudentShiftInfo.shiftId, this.StudentShiftInfo)
                .subscribe(result => {
                    alert(result.shiftName + ' updated successfully');
                    this.LoadList();
                    $('#studentShiftInfoModal').modal('hide');
                }, error => console.error(error));
        }

    }


    public GetStudentShiftInfo(id: number) {

        this.Http.get<StudentShiftInfo>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.StudentShiftInfo = result;
                $('#studentShiftInfoModal').modal('show');
            }, error => console.error(error));

    }

    public DeleteConfirmation(p: StudentShiftInfo) {

        this.StudentShiftInfo = p;
        $('#deleteModal').modal('show');

    }
    public DeleteStudentShiftInfo(id: number) {
        this.Http.delete<StudentShiftInfo>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.StudentShiftInfo = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => console.error(error));

    }
}

class StudentShiftInfo {
    public shiftId: number=0;
    public shiftName: string=null;
}
