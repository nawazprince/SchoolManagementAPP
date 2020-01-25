import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';



declare var $: any;



@Component({
    selector: 'app-group',
    templateUrl: './group.component.html'
})

export class GroupComponent {

    public GroupList: Group[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Group: Group;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");


    }

    public LoadList() {

        this.Http.get<Group[]>(this.BaseUrl + 'api/Groups')
            .subscribe(result => {
                this.GroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel(null);
    }


    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Group = new Group();
    }



    public SubmitGroup(form: NgForm) {
        if (this.Group.groupId == 0) {
            this.CreateGroup(form);
        }
        else {
            this.UpdateGroup(form);
        }
    }

    CreateGroup(form: NgForm) {

        const httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'enctype': 'multipart/form-data'
            })
        };

        this.Http.post<Group>(this.BaseUrl + 'api/Groups', this.Group
        )
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#GroupModal').modal('hide');
                this.Toastr.successToastr(result.groupName + ' create successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error CreateGroup "));
    }

    UpdateGroup(form: NgForm) {

        let options = new HttpHeaders();
        options.append('Content-Type', 'multipart/form-data');

        let reqOpt = { headers: options };

        this.Http.put(this.BaseUrl + 'api/Groups/' + this.Group.groupId, this.Group, reqOpt)
            .subscribe(result => {
                let name = this.Group.groupName;
                this.LoadList();
                this.Cancel(form);
                $('#GroupModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error UpdateGroup"));
    }



    public GetGroup(id: number) {

        this.Http.get<Group>(this.BaseUrl + 'api/Groups/' + id)
            .subscribe(result => {
                this.Group = result;
                $('#GroupModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error GetGroup"));

    }

    public DeleteConfirmation(g: Group) {

        this.Group = g;
        $('#deleteModal').modal('show');

    }
    public DeleteGroup(id: number) {





        this.Http.delete<Group>(this.BaseUrl + 'api/Groups/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.groupName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Group {
    public groupId: number = 0;
    public groupName: string = null;
}
