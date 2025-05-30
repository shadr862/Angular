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
import { EmployeeCustomValidator } from '../custom-validator/employee-custom-validator';
import { LoginService } from '../../Auth/login-service/login.service';

@Component({
  selector: 'hinv-emloyee-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatIcon,
    MatCheckboxModule
  ],
  templateUrl: './emloyee-edit.component.html',
  styleUrls: ['./emloyee-edit.component.scss'] // ✅ fixed typo
})
export class EmloyeeEditComponent implements OnInit {
  EmployeeForm!: FormGroup;
  passedEmployee: any;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.EmployeeForm = this.fb.group({
      Id: new FormControl({ value: '', disabled: true }),
      Name: ['', [Validators.required, Validators.minLength(3),EmployeeCustomValidator.NameValidator,EmployeeCustomValidator.SpeecialCharValidator('*')]],
      Email: new FormControl('', [Validators.required, EmployeeCustomValidator.EmailValidator]),
      Phone: new FormControl('', [Validators.required]),
      JoiningDate: ['', [Validators.required]],
      Role:['',[Validators.required]],

      AddressE: this.fb.group({
        AddressLine: [''],
        City: [''],
        Country: ['']
      }),

      RelationalStatusForm: this.fb.array([]), // ✅ initialized empty
      Allow: ['', Validators.requiredTrue]
    });

    this.passedEmployee = history.state.emp;
    this.getDefaultData();
  }

  getDefaultData() {
    if (this.passedEmployee) {
      // ✅ dynamically add Religion if present
      if (this.passedEmployee.religion) {
        this.addReligion();
      }

      this.EmployeeForm.patchValue({
        Id: this.passedEmployee.employeeId,
        Name: this.passedEmployee.name,
        Email: this.passedEmployee.email,
        Phone: this.passedEmployee.phone,
        Religion: this.passedEmployee.religion ?? '',
        JoiningDate: new Date(this.passedEmployee.joiningDate).toISOString().slice(0, 10),
        Role:this.passedEmployee.role,
        AddressE: {
          AddressLine: this.passedEmployee.address?.addressLine ?? '',
          City: this.passedEmployee.address?.city ?? '',
          Country: this.passedEmployee.address?.country ?? ''
        },
        Allow: this.passedEmployee.allow
      });

    
      this.RelationalStatus.clear();

      // ✅ fixed loop over array
      if (Array.isArray(this.passedEmployee.relationalStatusList)) {
        this.passedEmployee.relationalStatusList.forEach((element: any) => {
          this.RelationalStatus.push(
            this.fb.group({
              Name: [element.name],
              Status: [element.status]
            })
          );
        });
      }
    }
  }

  addReligion() {
    if (!this.EmployeeForm.get('Religion')) {
      this.EmployeeForm.addControl('Religion', new FormControl(''));
    }
  }

  deleteReligion() {
    if (this.EmployeeForm.get('Religion')) {
      this.EmployeeForm.removeControl('Religion');
    }
  }

  get RelationalStatus() {
    return this.EmployeeForm.get('RelationalStatusForm') as FormArray;
  }

  AddRelationalStatus() {
    return this.RelationalStatus.push(this.AddRelationalStatusControl());
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

  EditEmployee() {
    console.log(this.passedEmployee.employeeId, this.EmployeeForm.getRawValue());

    this.employeeService
      .EditEmployee(this.passedEmployee.employeeId, this.EmployeeForm.getRawValue())
      .pipe(
        tap(() => {
          this.employeeService.triggerRefresh();
        }),
        switchMap(() => this.router.navigateByUrl('/ds/employee'))
      )
      .subscribe(() => {
        this.EmployeeForm.reset();
      });
  }
}
