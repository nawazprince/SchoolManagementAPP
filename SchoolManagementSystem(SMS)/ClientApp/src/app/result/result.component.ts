import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { isNullOrUndefined } from 'util';
declare var $: any;


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html'
})
export class ResultComponent {
    public ResultList: Result[];
   
    public StudentDetailsInfoList: StudentDetailsInfo[];
    public ExamList: Exam[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Result: Result;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Result[]>(this.BaseUrl + 'api/Results').subscribe(result => {
            this.ResultList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
        this.LoadExamList();
        this.LoadStudentDetailsInfoList();
        this.LoadExamList();
    }

    public LoadExamList() {

        this.Http.get<Exam[]>(this.BaseUrl + 'api/Exams')
        .subscribe(result => {
            this.ExamList = result;
        }, error => this.Toastr.errorToastr(error, "Error LoadExamList"));
      this.Cancel();
    }
    public LoadStudentDetailsInfoList() {

        this.Http.get<StudentDetailsInfo[]>(this.BaseUrl + 'api/StudentDetailsInfoes')
            .subscribe(result => {
                this.StudentDetailsInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadStudentDetailsInfoList"));
        this.Cancel();
    }
    public Cancel() {

        this.Result = new Result();
    }

    public SubmitResult(form: NgForm) {

        if (this.Result.resultId == 0) {
            this.Http.post<Result>(this.BaseUrl + 'api/Results', this.Result)
                .subscribe(result => {
                    if (isNullOrUndefined (result) ) return;
                    this.LoadList();
                    form.reset();
                    $('#resultModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error SubmitResult"));
        }
        else {
            this.Http.put<Result>(this.BaseUrl + 'api/Results/' + this.Result.resultId, this.Result)
                .subscribe(result => {
                    
                    this.LoadList();
                    form.reset();
                    $('#resultModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitResult else"));
        }

    }




    public GetResult(id: number) {

        this.Http.get<Result>(this.BaseUrl + 'api/Results/' + id)
            .subscribe(result => {
                this.Result = result;
                $('#resultModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error GetResult"));

    }

    public DeleteConfirmation(r: Result) {

        this.Result = r;
        $('#deleteModal').modal('show');

    }
    public DeleteResult(id: number) {

        this.Http.delete<Result>(this.BaseUrl + 'api/Results/' + id)
            .subscribe(result => {
                this.Result = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error DeleteResult"));

    }
}





class Result {
    resultId: number = 0;
    examId: number;
    studentId: number;
    mcqMarks: number = 0;
    writtenMarks: number = 0;
    practical: number = 0;
    ctMarks: number = 0;
    grade: string = null;
    resultDate: string = null;
   
   
     classError: string;

 
}
interface Exam {
    examId: number;
  examDate: string ;
 

}
interface StudentDetailsInfo {
    studentId: number;
    rollNo: number;

}
