import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { Employee } from '../../model/employee';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalstorageService } from '../../service/localstorage.service';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ MatPaginatorModule, MatTableModule,MatFormFieldModule, ReactiveFormsModule, MatInputModule,MatButtonModule,MatDialogModule,MatSortModule,MatToolbarModule,MatIconModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employeeForm!: FormGroup;
  actionBtn:string='Save';

  constructor(private formBuilder: FormBuilder,
              private employeeService:EmployeeService,
              private matDialogRef:MatDialogRef<EmployeeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private localStorageService:LocalstorageService
  ){}

  ngOnInit(){
    this.employeeForm= this.formBuilder.group({
      id:['', Validators.required],
      name:['',Validators.required],
      position:['',Validators.required],
      salary:['', Validators.required]
    })

    if(this.editData){
      this.actionBtn='Update';
      this.employeeForm.controls['id'].setValue(this.editData.id);
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['position'].setValue(this.editData.position);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
    }

    const employee = this.localStorageService.getItem('employee');

  }

  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.employeeService.createEmployees(this.employeeForm.value).subscribe({next:(res:any)=>{
          alert("Employee Added Successfully");
          this.employeeForm.reset;
          this.matDialogRef.close('save');
          this.localStorageService.setItem('employee', res);
        },
      error:()=>{
        alert("Error while adding employee");
      }
      })
      }
    }else{
      this.updateEmployee();
    }
  }


  updateEmployee(){
    this.employeeService.updateEmployee(this.editData.id, this.employeeForm.value).subscribe({
      next:(res:any)=>{
        alert("Employee updated Successfully");
        this.employeeForm.reset();
        this.matDialogRef.close('update')
      },
      error:()=>{
        alert("Employee updated Error")
      }
    })
  }



  removeUser() {
    this.localStorageService.removeItem('employee');
  }

  clearStorage() {
    this.localStorageService.clear();
  }

}
