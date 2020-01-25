import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';



declare var $: any;



@Component({
  selector: 'app-term',
  templateUrl: './term.component.html'
})

export class TermComponent {

    public TermList: Term[];
  public Http: HttpClient;
  public BaseUrl: string;
  public Toastr: ToastrManager;

    public Term: Term;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

    this.Http = http;
    this.BaseUrl = baseUrl;
    this.Toastr = toastr;
    this.LoadList();
    this.Toastr.successToastr(' Data loaded successfully', "Success");


  }

  public LoadList() {

      this.Http.get<Term[]>(this.BaseUrl + 'api/ExamTerms')
      .subscribe(result => {
          this.TermList = result;
      }, error => this.Toastr.errorToastr(error, "Error"));
    this.Cancel(null);
  }


  public Cancel(form: NgForm) {
    
    if (form != null)
      form.resetForm();

      this.Term = new Term();
  }
  


    public SubmitTerm(form: NgForm) {
        if (this.Term.examTermId == 0) {
            this.CreateTerm(form);
    }
    else {
          this.UpdateTerm(form);
    }
  }

    CreateTerm(form: NgForm) {

   
        this.Http.post<Term>(this.BaseUrl + 'api/ExamTerms', this.Term      
      )
      .subscribe(result => {
        this.LoadList();
        this.Cancel(form);
          $('#TermModal').modal('hide');
          this.Toastr.successToastr(result.examTermName + ' create successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }

    UpdateTerm(form: NgForm) {

   

        this.Http.put(this.BaseUrl + 'api/ExamTerms/' + this.Term.examTermId, this.Term)
      .subscribe(result => {
          let name = this.Term.examTermName;
        this.LoadList();
        this.Cancel(form);
          $('#TermModal').modal('hide');
        this.Toastr.successToastr(name + ' updated successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }



    public GetTerm(id: number) {

        this.Http.get<Term>(this.BaseUrl + 'api/ExamTerms/' + id)
      .subscribe(result => {
          this.Term = result;
          $('#TermModal').modal('show');
      }, error => this.Toastr.errorToastr(error, "Error"));

  }

    public DeleteConfirmation(c: Term) {

        this.Term = c;
    $('#deleteModal').modal('show');

  }
    public DeleteTerm(id: number) {





        this.Http.delete<Term>(this.BaseUrl + 'api/ExamTerms/' + id)
      .subscribe(result => {
        this.LoadList();
        $('#deleteModal').modal('hide');
          this.Toastr.successToastr(result.examTermName + ' deleted successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));

  }
}

class Term {
    public examTermId: number = 0;
    public examTermName: string = null; 
}
