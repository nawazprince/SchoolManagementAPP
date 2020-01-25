import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-exam',
    templateUrl: './exam.component.html'
})
export class ExamComponent {

    public ExamList: Exam[];
    public ExamYearList: ExamYear[];
    public ExamTermList: ExamTerm[];
    public SubjectList: Subject[];
    public ClassList: Class[];
    public Toastr: ToastrManager;
    public Http: HttpClient;
    public BaseUrl: string;
    public Exam: Exam;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl ;

        this.Exam = new Exam();
        this.Toastr = toastr;
        this.LoadList();
        this.LoadExamYearList();
        this.LoadExamTermList();
        this.LoadSubjectList();
        this.LoadClassList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");

       
    }
    public LoadList() {

        this.Http.get<Exam[]>(this.BaseUrl + 'api/Exams')
            .subscribe(result => {
                this.ExamList = result;
            }, error => console.error(error));

    }
    public LoadExamYearList() {

        this.Http.get<ExamYear[]>(this.BaseUrl + 'api/ExamYears')
            .subscribe(result => {
                this.ExamYearList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadExamYearList"));
        this.Cancel();
    }
    public LoadExamTermList() {

        this.Http.get<ExamTerm[]>(this.BaseUrl + 'api/ExamTerms')
            .subscribe(result => {
                this.ExamTermList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadExamTermList"));
        this.Cancel();
    }
    public LoadSubjectList() {

        this.Http.get<Subject[]>(this.BaseUrl + 'api/Subjects')
            .subscribe(result => {
                this.SubjectList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadSubjectList"));
        this.Cancel();
    }
    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
            .subscribe(result => {
                this.ClassList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadClassList"));
        this.Cancel();
    }
  
    public Cancel() {

        this.Exam = new Exam();
    }

    public SubmitExam() {

        if (this.Exam.examId == 0) {
            this.Http.post<Exam>(this.BaseUrl + 'api/Exams', this.Exam)
                .subscribe(result => {
                    this.LoadList();
                    $('#examModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "Error SubmitExam post"));
        }
        else {
            this.Http.put<Exam>(this.BaseUrl + 'api/Exams/' + this.Exam.examId, this.Exam)
                .subscribe(result => {
                    this.LoadList();
                    $('#examModal').modal('hide');
                }, error => this.Toastr.errorToastr(error, "Error SubmitExam put"));
        }

    }

    public GetExam(id: number) {

        this.Http.get<Exam>(this.BaseUrl + 'api/Exams/' + id)
            .subscribe(result => {
                this.Exam = result;
                $('#examModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error GetExam"));
    }
    public DeleteConfirmation(e: Exam) {

        this.Exam = e;
        $('#deleteModal').modal('show');

    }
    public DeleteExam(id: number) {

        this.Http.delete<Exam>(this.BaseUrl + 'api/Exams/' + id)
            .subscribe(result => {
                this.Exam = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => this.Toastr.errorToastr(error, "Error DeleteExam"));

    }
}
interface ExamYear {
    examYearId: number;
    examYearDate: number;
}
interface ExamTerm {
    examTermId: number;
    examTermName: string;
}
interface Subject {
    subjectId: number;
    subjectName: string;
}
interface Class {
    classId: number;
    className: string;
}
class Exam {
    public examId: number = 0;
    public examDate: Date = new Date();
    public classId: number;
    public examYearId: number;
    public examTermId: number;
    public subjectId: number;
  

   
 
    
}
