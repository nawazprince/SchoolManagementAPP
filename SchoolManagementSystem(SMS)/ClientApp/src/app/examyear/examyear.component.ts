import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Data } from '@angular/router';



declare var $: any;



@Component({
    selector: 'app-examyear',
    templateUrl: './examyear.component.html'
})

export class ExamYearComponent {

    public ExamYearList: ExamYear[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public ExamYear: ExamYear;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }

    public LoadList() {

        this.Http.get<ExamYear[]>(this.BaseUrl + 'api/ExamYears')
            .subscribe(result => {
                this.ExamYearList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel(null);
    }


    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.ExamYear = new ExamYear();
    }



    public SubmitExamYear(form: NgForm) {
        if (this.ExamYear.examYearId == 0) {
            this.CreateExamYear(form);
        }
        else {
            this.UpdateExamYear(form);
        }
    }

    CreateExamYear(form: NgForm) {

     

        this.Http.post<ExamYear>(this.BaseUrl + 'api/ExamYears', this.ExamYear
        )
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#ExamYearModal').modal('hide');
                this.Toastr.successToastr(result.examYearDate + ' create successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    UpdateExamYear(form: NgForm) {


        this.Http.put(this.BaseUrl + 'api/ExamYears/' + this.ExamYear.examYearId, this.ExamYear)
            .subscribe(result => {
                let name = this.ExamYear.examYearDate;
                this.LoadList();
                this.Cancel(form);
                $('#ExamYearModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public GetExamYear(id: number) {

        this.Http.get<ExamYear>(this.BaseUrl + 'api/ExamYears/' + id)
            .subscribe(result => {
                this.ExamYear = result;
                $('#ExamYearModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(g: ExamYear) {

        this.ExamYear = g;
        $('#deleteModal').modal('show');

    }
    public DeleteExamYear(id: number) {





        this.Http.delete<ExamYear>(this.BaseUrl + 'api/ExamYears/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.examYearDate + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class ExamYear {
    public examYearId: number = 0;
    public examYearDate: number;
}
