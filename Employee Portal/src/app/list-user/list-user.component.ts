import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/Employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public gridData: any[];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() { this.gridBind(); }

  editHandler({ dataItem }) {
    this.router.navigate(['edit-user', dataItem.Id]);
  }
  removeHandler({ dataItem }) {
    this.employeeService.deleteEmployee(dataItem).subscribe(
      data => { this.gridBind(); },
      error => { console.log(error.status); }
    );
  }
  gridBind() { this.employeeService.getEmployeeList().subscribe((data: any) => { this.gridData = data; }); }
}
