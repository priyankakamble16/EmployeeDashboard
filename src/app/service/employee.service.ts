import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl='http://localhost:3000/employees';
  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get(`${this.baseUrl}`);
  }

  createEmployees(data:Employee){
    return this.http.post(`${this.baseUrl}`,data);
  }

  updateEmployee(id:number,data:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  deleteEmployee(id:number ){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getEmployeeById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
