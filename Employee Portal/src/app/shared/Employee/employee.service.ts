import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = environment.baseUrl + '/api/Employee';
  constructor(private http: HttpClient) { }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployeeById(id) {
    return this.http.get<Employee>(this.url + '/' + id);
  }

  insertEmployee(employee: Employee) {
    return this.http.post(this.url, employee);
  }

  deleteEmployee(employee: Employee) {
    return this.http.delete(this.url + '/' + employee.Id);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + '/' + employee.Id, employee);
  }
}
