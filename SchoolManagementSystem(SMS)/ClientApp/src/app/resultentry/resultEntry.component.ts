import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { isNullOrUndefined } from 'util';
declare var $: any;


@Component({
    selector: 'app-resultentry',
    templateUrl: './resultentry.component.html'
})
export class ResultEntryComponent {

    public ResultEntryList: ResultEntry[];
    public ClassList: Class[];
    public StudentSectionInfoList: StudentSectionInfo[];
    public SubjectList: Subject[];
    public GroupList: Group[];
    public StudentShiftInfoList: StudentShiftInfo[];
    public ExamTermList: ExamTerm[];
    public StudentDetailsInfoList: StudentDetailsInfo[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public ResultEntry: ResultEntry;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<ResultEntry[]>(this.BaseUrl + 'api/ResultEntries').subscribe(result => {
            this.ResultEntryList = result;
        }, error => this.Toastr.errorToastr(error, "error LoadList"));
        this.Cancel();
        this.LoadExamTermList();
        this.LoadStudentDetailsInfoList();
        this.LoadStudentShiftInfoList();
        this.LoadClassList();
        this.LoadStudentSectionInfoList();
        this.LoadSubjectList();
        this.LoadGroupList();
    }


    public LoadStudentShiftInfoList() {

        this.Http.get<StudentShiftInfo[]>(this.BaseUrl + 'api/StudentShiftInfoes')
            .subscribe(result => {
                this.StudentShiftInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadStudentShiftInfoList"));
        this.Cancel();
    }


    public LoadExamTermList() {

        this.Http.get<ExamTerm[]>(this.BaseUrl + 'api/ExamTerms')
            .subscribe(result => {
                this.ExamTermList = result;
            }, error => this.Toastr.errorToastr(error, "Error ExamTerm"));
        this.Cancel();
    }
    public LoadStudentDetailsInfoList() {

        this.Http.get<StudentDetailsInfo[]>(this.BaseUrl + 'api/StudentDetailsInfoes')
            .subscribe(result => {
                this.StudentDetailsInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadStudentDetailsInfoList"));
        this.Cancel();
    }



    public LoadClassList() {

        this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
            .subscribe(result => {
                this.ClassList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadClassList"));
        this.Cancel();
    }



    public LoadStudentSectionInfoList() {

        this.Http.get<StudentSectionInfo[]>(this.BaseUrl + 'api/StudentSectionInfoes')
            .subscribe(result => {
                this.StudentSectionInfoList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadStudentSectionInfoList"));
        this.Cancel();
    }




    public LoadSubjectList() {

        this.Http.get<Subject[]>(this.BaseUrl + 'api/Subjects')
            .subscribe(result => {
                this.SubjectList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadSubjectList"));
        this.Cancel();
    }

    public LoadGroupList() {

        this.Http.get<Group[]>(this.BaseUrl + 'api/Groups')
            .subscribe(result => {
                this.GroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadGroupList"));
        this.Cancel();
    }

    public Cancel() {

        this.ResultEntry = new ResultEntry();
    }

    public SubmitResultEntry(form: NgForm) {

        if (this.ResultEntry.resultEntryId == 0) {
            this.Http.post<ResultEntry>(this.BaseUrl + 'api/ResultEntries', this.ResultEntry)
                .subscribe(result => {
                    if (isNullOrUndefined(result)) return;
                    this.LoadList();
                    form.reset();
                    $('#resultEntryModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitResultEntry"));
        }
        else {
            this.Http.put<ResultEntry>(this.BaseUrl + 'api/ResultEntries/' + this.ResultEntry.resultEntryId, this.ResultEntry)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#resultEntryModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitResultEntry put"));
        }

    }




    public GetResultEntry(id: number) {

        this.Http.get<ResultEntry>(this.BaseUrl + 'api/ResultEntries/' + id)
            .subscribe(result => {
                this.ResultEntry = result;
                $('#resultEntryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error GetResultEntry"));

    }

    public DeleteConfirmation(r: ResultEntry) {

        this.ResultEntry = r;
        $('#deleteModal').modal('show');

    }
    public DeleteResultEntry(id: number) {

        this.Http.delete<ResultEntry>(this.BaseUrl + 'api/ResultEntries/' + id)
            .subscribe(result => {
                this.ResultEntry = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error DeleteResultEntry"));

    }
}





class ResultEntry {
    resultEntryId: number = 0;
    shiftId: number;
    studentDetailsId: number;
    classId: number;
    sectionId: number;
    groupId: number;
    termId: number;
    subjectId: number;
    mcqMarks: number = 0;
    writtenMarks: number = 0;
    practical: number = 0;
    ctMarks: number = 0;
    grade: string = null;
    resultDate: string = null;


    classError: string;



}
interface StudentShiftInfo {
    shiftId: number;
    shiftName: string;
}

interface Class {
    classId: number;
    className: string;
}

interface Group {
    groupId: number;
    groupName: string;
}
interface StudentSectionInfo {
    sectionId: number;
    sectionName: string;
}


interface Subject {
    subjectId: number;
    subjectName: string;
}

interface ExamTerm {
    examTerm: number;
    examTermName: string;
}


interface StudentDetailsInfo {
    studentDetailsId: number;
    rollNo: number;

}











//interface ExamYear {
//    examYearId: number;
//    examYearDate: string;
//}
//interface Exam {
//    examId: number;
//    examDate: string;
//}
//interface Result {
//    resultId: number;
//    examId: number;
//    studentDetailsId: number;
//    mcqMarks: number;
//    writtenMarks: number;
//    practical: number;
//    ctMarks: number;
//    resultDate: string;
//    grade: string;
//}






//class ResultSheetViewModel {
//    public YearId: number;
//    public TermId: number;
//    public ClassId: number;
//    public SectionId: number;
//    public ShiftId: number;
//    public SubjectId: number;
//    public GroupId: number;
//    public ResultEntryListItems: ResultEntryListItem[] = new Array<ResultEntryListItem>();
//}


//class ResultEntryListItem {
//    public resultId: number;
//    public examId: number;
//    public StudentDetailsId: number;
//    public StudentName: string;
//    public Class: string;
//    public Section: string;
//    public Shift: string;
//    public SubjectId: number;
//    public SubMCQ: number;
//    public SubWRITTEN: number;
//    public SubPRAC: number;
//    public SubCTMarks: number;
//    public SubPassMark: number;
//    public MCQ: number;
//    public WRITTEN: number;
//    public PRAC: number;
//    public CTMarks: number;
//    public TOTAL: number;
//    public Grade: number;
//    public GradePoint: number;
//    public Pass: number;
//}

