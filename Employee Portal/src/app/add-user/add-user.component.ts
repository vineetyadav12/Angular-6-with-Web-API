import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/Department/department.service';
import { Department } from '../models/department';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/Employee/employee.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    departments: Department[];
    loding = false;
    submitted = false;

    constructor(private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private router: Router) { }

    insertForm = this.formBuilder.group({
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
    }

    get f() { return this.insertForm.controls; }

    onSubmit() {
        // debugger;
        this.submitted = true;

        if (this.insertForm.invalid) { return; }

        this.loding = true;

        this.employeeService.insertEmployee(this.insertForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('success');
                    this.router.navigate(['list-user']);
                },
                error => {
                    console.log(error.status);
                    console.log(error.message);
                    this.loding = false;
                }
            );
    }
}
