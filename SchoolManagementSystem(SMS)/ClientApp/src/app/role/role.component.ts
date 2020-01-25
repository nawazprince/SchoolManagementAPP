import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent {

    public Roles: Role[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Role: Role;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        this.Http = http;
        this.BaseUrl = baseUrl + 'api/Roles';



        this.LoadList();

    }

    public LoadList() {

        this.Http.get<Role[]>(this.BaseUrl)
            .subscribe(result => {
                this.Roles = result;
            }, error => console.error(error));
        this.Cancel();
    }

    public Cancel() {

        this.Role = new Role();
    }

    public SubmitRole() {

        if (this.Role.Id == null) {
            this.Http.post<Role>(this.BaseUrl, this.Role)
                .subscribe(result => {
                    alert(result.Name + ' create successfully');
                    this.LoadList();
                    $('#RoleModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<Role>(this.BaseUrl + '/' + this.Role.Id, this.Role)
                .subscribe(result => {
                    alert(result.Name + ' updated successfully');
                    this.LoadList();
                    $('#RoleModal').modal('hide');
                }, error => console.error(error));
        }





    }




    public GetRole(Id: number) {

        this.Http.get<Role>(this.BaseUrl + '/' + Id)
            .subscribe(result => {
                this.Role = result;
                $('#RoleModal').modal('show');
            }, error => console.error(error));

    }

    public DeleteConfirmation(r: Role) {

        this.Role = r;
        $('#deleteModal').modal('show');

    }
    public DeleteRole(Id: number) {





        this.Http.delete<Role>(this.BaseUrl + '/' + Id)
            .subscribe(result => {
                this.Role = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => console.error(error));

    }
}

class Role {





    public Id: string=null ;
    public Name: string=null;
  
}
