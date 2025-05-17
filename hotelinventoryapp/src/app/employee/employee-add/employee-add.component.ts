import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeService } from '../service/employee.service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'hinv-employee-add',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, MatInputModule, MatExpansionModule,
    MatIcon, MatCheckboxModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAddComponent implements OnInit {
  EmployeeForm!: FormGroup

  constructor(private fb: FormBuilder, 
    private employeeService: EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
    this.EmployeeForm = this.fb.group({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [Validators.required]),
      JoiningDate: ['', [Validators.required]],

      AddressE: this.fb.group({
        AddressLine: [''],
        City: [''],
        Country: [''],
      }),

      RelationalStatusForm: this.fb.array([this.AddRelationalStatusControl()]),
      Allow: ['', Validators.requiredTrue]
    })
    this.getDefaultData();
  }

  getDefaultData() {
    this.EmployeeForm.patchValue({
      Name: 'Riaz Mehedi',
      Email: 'test@gmail.com',
      Phone: '01783882221',
      Religion: 'Islam',
      JoiningDate: new Date('2025-05-03'),

      AddressE: {
        AddressLine: '98/34 Katlapur, Savar',
        City: 'Dhaka',
        Country: 'Bangladesh'
      },

      RelationalStatusForm: [
        { Name: 'Rafi', Status: 'Brother' }
      ],

      Allow: false
    });

  }
  addReligion() {
    this.EmployeeForm.addControl('Religion', new FormControl(''))
  }
  deleteReligion() {
    if (this.EmployeeForm.get('Religion')) {
      this.EmployeeForm.removeControl('Religion');
    }
  }

  get RelationalStatus() {
    return this.EmployeeForm.get('RelationalStatusForm') as FormArray
  }

  AddRelationalStatus() {
    return this.RelationalStatus.push(this.AddRelationalStatusControl())
  }

  AddRelationalStatusControl() {
    return this.fb.group({
      Name: ['', Validators.required],
      Status: ['']
    });
  }
  RemoveRelationalStatus(ind: number) {
    this.RelationalStatus.removeAt(ind);
  }

  AddEmployee() {
    console.log(this.EmployeeForm.getRawValue());
    this.employeeService.AddEmployee(this.EmployeeForm.getRawValue()).pipe(
       tap(()=>{
         this.employeeService.triggerRefresh();
       }),
       switchMap(()=>this.router.navigateByUrl('/ds/employee'))
    ).subscribe(() => {
      this.EmployeeForm.reset({

        Name: 'Riaz Mehedi',
        Email: 'test@gmail.com',
        Phone: '01783882221',
        Religion: 'Islam',
        JoiningDate: new Date('2025-05-03'),

        AddressE: {
          AddressLine: '98/34 Katlapur, Savar',
          City: 'Dhaka',
          Country: 'Bangladesh'
        },

        RelationalStatusForm: [
          { Name: 'Rafi', Status: 'Brother' }
        ],

        Allow: false
      });
    })
  }
}