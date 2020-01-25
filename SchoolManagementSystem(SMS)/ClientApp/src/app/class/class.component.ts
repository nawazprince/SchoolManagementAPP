import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';



declare var $: any;



@Component({
  selector: 'app-class',
  templateUrl: './class.component.html'
})

export class ClassComponent {

    public ClassList: Class[];
  public Http: HttpClient;
  public BaseUrl: string;
  public Toastr: ToastrManager;

    public Class: Class;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

    this.Http = http;
    this.BaseUrl = baseUrl;
    this.Toastr = toastr;
    this.LoadList();
    this.Toastr.successToastr(' Data loaded successfully', "Success");


  }

  public LoadList() {

      this.Http.get<Class[]>(this.BaseUrl + 'api/Classes')
      .subscribe(result => {
        this.ClassList = result;
      }, error => this.Toastr.errorToastr(error, "Error"));
    this.Cancel(null);
  }


  public Cancel(form: NgForm) {
    
    if (form != null)
      form.resetForm();

      this.Class = new Class();
  }
  


  public SubmitClass(form: NgForm) {
      if (this.Class.classId == 0) {
      this.CreateClass(form);
    }
    else {
      this.UpdateClass(form);
    }
  }

  CreateClass(form: NgForm) {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'enctype': 'multipart/form-data'
      })
    };

      this.Http.post<Class>(this.BaseUrl + 'api/Classes', this.Class      
      )
      .subscribe(result => {
        this.LoadList();
        this.Cancel(form);
        $('#classModal').modal('hide');
        this.Toastr.successToastr(result.className + ' create successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }

  UpdateClass(form: NgForm) {

    let options = new HttpHeaders();
    options.append('Content-Type', 'multipart/form-data');

    let reqOpt = { headers: options };

      this.Http.put(this.BaseUrl + 'api/Classes/' + this.Class.classId, this.Class, reqOpt)
      .subscribe(result => {
        let name = this.Class.className;
        this.LoadList();
        this.Cancel(form);
        $('#classModal').modal('hide');
        this.Toastr.successToastr(name + ' updated successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }



  public GetClass(id: number) {

      this.Http.get<Class>(this.BaseUrl + 'api/Classes/' + id)
      .subscribe(result => {
        this.Class = result;
        $('#classModal').modal('show');
      }, error => this.Toastr.errorToastr(error, "Error"));

  }

    public DeleteConfirmation(c: Class) {

        this.Class = c;
    $('#deleteModal').modal('show');

  }
  public DeleteClass(id: number) {





      this.Http.delete<Class>(this.BaseUrl + 'api/Classes/' + id)
      .subscribe(result => {
        this.LoadList();
        $('#deleteModal').modal('hide');
        this.Toastr.successToastr(result.className + ' deleted successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));

  }
}

class Class {
  public classId: number = 0;
  public className: string = ''; 
}
