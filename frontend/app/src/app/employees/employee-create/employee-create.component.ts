import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../shared/services/roles.service';
import { Roles } from '../domain/entities/roles';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { EmployeeDto } from '../domain/dtos/EmployeeDto';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service/employee.service';
import { Employee } from '../domain/entities/employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  
  public roles:Roles[] = [];
  public checkBoxRoles:Map<string,boolean> = new Map<string,boolean>();
  public formGroup:FormGroup;
  employeeRoles:string[] = [];

  constructor(private rolesService:RolesService, private fb:FormBuilder, private route:Router, private employeeService:EmployeeService) {}

  ngOnInit(): void {
     this.getRoles();
     this.initiateFormGroup();
  }

 private initiateFormGroup(): void
 {
    this.formGroup = this.fb.group(
      {
        employeeModel: this.fb.group({
          id: new FormControl(),
          username: new FormControl(),
          email: new FormControl(),
          age: new FormControl(),
          doc: new FormControl(),
          password: new FormControl(),
           roles: this.fb.array  ([])
        })
      }
    )
 }

  getRoles()
  {
      this.rolesService.getAll().subscribe(
        {
          next: (result:Roles[]) =>
          {
               this.roles = result;
          },
          error: (error:any) =>
          {
            console.log(error);
          }
        }
      )
  }

  onRolesAdded(roleName:string)
  {
      const formArray:any = this.formGroup.get('employeeModel')?.get("roles") as FormArray;
      this.employeeRoles =  formArray.value;
      var getRole = this.checkBoxRoles.get(roleName);
      var roleInList = this.employeeRoles.findIndex((s:any) => s == roleName);

      if(getRole && (roleInList >= 0))
      {
        this.checkBoxRoles.set(roleName, false);
        this.employeeRoles.splice(roleInList, 1);
      }
      else
      {
        this.checkBoxRoles.set(roleName,true);
        this.employeeRoles.push(roleName);
      }
  }

  onSubmit():void
  {
      var employeeForm:any= this.formGroup.value.employeeModel;
      var employee: Employee = new Employee();
      var roles:Roles[] = [];

      for(let i =0; i < this.employeeRoles.length;i++)
       {
          var getRole:Roles[] = this.roles.filter(s => s.name == this.employeeRoles[i]);
          var role:Roles = new Roles();
          role.id = getRole[0].id;
          role.name = getRole[0].name;
          roles.push(role);
       }
       
     employee.username = employeeForm.username;
     employee.age = employeeForm.age;
     employee.email = employeeForm.email;
     employee.doc = employeeForm.doc;
     employee.roles = roles;
     employee.password = employeeForm.password;

     this.employeeService.create(employee).subscribe({
        next: () => {this.route.navigate(['/..','employees'])},
        error: error => console.log(error)
     });
  }



}
