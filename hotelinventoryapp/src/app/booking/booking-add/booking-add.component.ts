import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from '../service/booking.service';
import { exhaustMap, mergeMap, switchMap, tap } from 'rxjs';
import { CustomValidator } from '../validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  // Removed invalid 'imports' property
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule,
    MatExpansionModule, MatIcon, MatCheckboxModule],
  standalone: true,
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.scss']
})
export class BookingAddComponent implements OnInit {
  BookingForm!: FormGroup

  get guests() {
    return this.BookingForm.get('guestForm') as FormArray
  }

  constructor(private fb: FormBuilder,
    private bookingService: BookingService,
    private routerAc: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const roomId = this.routerAc.snapshot.paramMap.get('roomid');
    this.BookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true }),
      guestEmail: new FormControl('', { updateOn: 'blur', validators: [Validators.required, Validators.email] }),
      checkinDate: new FormControl(''),
      checkoutDate: new FormControl(''),
      bookingStatus: new FormControl(''),
      bookingAmount: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(10000)]),
      bookingDate: new FormControl(''),
      mobileNumber: new FormControl('', { updateOn: 'blur' }),
      guestName: new FormControl('', [Validators.required, Validators.minLength(4), CustomValidator.ValidateName, CustomValidator.validateSpecialChar('*')]),
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        City: [''],
        State: [''],
        Country: [''],
        ZipCode: [''],
      }),
      guestForm: this.fb.array([this.AddGuestControl()]),
      tnc: [false, [Validators.requiredTrue]]
    }, { updateOn: 'blur', validators: [CustomValidator.validateDate] })

    this.getBookingData();
    /*
    checking the value change for->updateon->blur
    this.BookingForm.valueChanges.subscribe((data)=>{
      console.log(data);
    })
    */
    /*
    for varify map->{updateOn:'change'}->end of the form
    switchmap->only care about new call
    mergemap->take all request randomly
    exhaustMap->take all call serially and after complete the previous one
    */
    // this.BookingForm.valueChanges.pipe(
    //   exhaustMap(data =>
    //     this.bookingService.AddBookroom(data)
    //   )
    // ).subscribe(data => {
    //   console.log(data);
    // });


  }

  getBookingData() {
    //can change it setValue->need all assignment
    this.BookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('05-05-2025'),
      checkoutDate: new Date('05-06-2025'),
      bookingStatus: 'valid',
      bookingAmount: '1000',
      bookingDate: new Date('05-03-2025'),
      mobileNumber: '0178388221',
      guestName: 'saad',
      address: {
        addressLine1: '98/34 katlapur,savar',
        addressLine2: 'Dhaka,Bangladesh',
        City: 'Savar',
        State: 'Dhaka',
        Country: 'Bangladesh',
        ZipCode: '1340',
      },
      guestForm: [{ guestName: 'rafi', age: '27' }],
      tnc: false
    })
  }

  addGuest() {
    this.guests.push(this.AddGuestControl());
  }
  AddGuestControl() {
    return this.fb.group({ guestName: ['', [Validators.required]], age: new FormControl('') });
  }
  //removing guest
  RemoveGuest(ind: number) {
    this.guests.removeAt(ind);
  }

  //add dynamic control
  addPassport() {
    this.BookingForm.addControl('passport', new FormControl(''));
  }
  //remove dynamic control
  deletePassport() {
    if (this.BookingForm.get('passport')) {
      this.BookingForm.removeControl('passport');
    }
  }

  //submit form
  addBooking() {
    console.log(this.BookingForm.getRawValue());
    this.bookingService.AddBookroom(this.BookingForm.getRawValue()).pipe(
      tap(() => {
        this.bookingService.triggerRefresh()
      }),
      switchMap(() =>
        this.router.navigateByUrl('/ds/booking/see')
      )
    ).subscribe((data) => {
     
      this.BookingForm.reset({
        roomId: '2',
        guestEmail: 'test@gmail.com',
        checkinDate: '',
        checkoutDate: '',
        bookingStatus: '',
        bookingAmount: '1000',
        bookingDate: '',
        mobileNumber: '0178388221',
        guestName: 'saad',
        address: {
          addressLine1: '98/34 katlapur,savar',
          addressLine2: 'Dhaka,Bangladesh',
          City: '',
          State: '',
          Country: '',
          ZipCode: '',
        },
        guestForm: [{ guestName: 'rafi', age: '27' }],
        tnc: false
      }
      )
    })
  }
}

