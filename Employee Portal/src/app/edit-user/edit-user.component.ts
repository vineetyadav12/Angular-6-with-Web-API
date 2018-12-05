import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/Employee/employee.service';
import { Employee } from '../models/employee';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DepartmentService } from '../shared/Department/department.service';
import { Department } from '../models/department';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private departmentService: DepartmentService, private employeeService: EmployeeService, private router: Router) { }
  departments: Department[];
  empId: number;
  employee: Employee;
  insertForm = this.fb.group({
    Id: this.empId,
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    Phone: ['', [Validators.required, Validators.minLength(10)]],
    Salary: ['', Validators.required],
    Department_ID: ['', Validators.required],
    Gender: ['', Validators.required]
  });

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((data: Department[]) => { this.departments = data; });
    this.empId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.employeeService.getEmployeeById(this.empId).subscribe((data: Employee) => {
      this.employee = data;
      this.loadData();
    });
  }
  loadData() {
    this.insertForm.patchValue({
      Id: this.empId,
      FirstName: this.employee.FirstName,
      LastName: this.employee.LastName,
      Email: this.employee.Email,
      Phone: this.employee.Phone,
      Salary: this.employee.Salary,
      Department_ID: this.employee.Department_ID,
      Gender: this.employee.Gender
    });
  }
  get f() { return this.insertForm.controls; }

  onSubmit() {
    if (this.insertForm.invalid) { return; }
    this.employeeService.updateEmployee(this.insertForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('success');
          this.router.navigate(['list-user']);
        },
        error => {
          console.log(error.status);
          console.log(error.message);
        }
      );
  }
}
