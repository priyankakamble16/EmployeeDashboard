import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from './service/employee.service';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, MatFormFieldModule,ReactiveFormsModule,MatPaginatorModule,MatTableModule, MatInputModule,MatSortModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeDashboard';
  employeeData:any=[];
  searchControl = new FormControl('');
  filteredResults: any[] = [];
  
  displayedColumns:string[]=['id','name','position','salary','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,
              private employeeService:EmployeeService
  ){}

  ngOnInit(){
    this.getAllEmployees();

  }

  openDialog(){
    this.dialog.open(EmployeeFormComponent,{
      width:'30%'
    }).afterClosed().subscribe(
      (val:any)=>{
        if(val==='save'){
          this.getAllEmployees();
        }
      }
    )
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe({next:(res:any)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
  error:()=>{
    alert("Error on adding Employee");
  }
  })
  }

  EditEmployee(row:any){
    this.dialog.open(EmployeeFormComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(
      (val:any)=>{
        if(val==='update'){
          this.getAllEmployees();
        }
      }
    )
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next:(res:any)=>{
        alert("Employee deleted Successfully");
        this.getAllEmployees();
      },
      error:()=>{
        alert("Error while deleting Employee");
      }
    })
  }

  applyFilter(event :any){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }
}
  

