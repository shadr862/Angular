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
import { switchMap, tap } from 'rxjs';
import { CustomValidator } from '../validators/custom-validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hinv-booking-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatIcon,
    MatCheckboxModule
  ],
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'] // ✅ fixed typo
})
export class BookingEditComponent implements OnInit {

  BookingForm!: FormGroup;
  passedBooking: any;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private routerAc: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.BookingForm = this.fb.group({
      roomId: new FormControl({ value: '', disabled: true }),
      guestEmail: new FormControl('', { updateOn: 'blur', validators: [Validators.required, Validators.email] }),
      checkinDate: new FormControl(''),
      checkoutDate: new FormControl(''),
      bookingStatus: new FormControl(''),
      bookingAmount: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(10000)]),
      bookingDate: new FormControl(''),
      mobileNumber: new FormControl('', { updateOn: 'blur' }),
      guestName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        CustomValidator.ValidateName,
        CustomValidator.validateSpecialChar('*')
      ]),
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        City: [''],
        State: [''],
        Country: [''],
        ZipCode: ['']
      }),
      guestForm: this.fb.array([]),
      tnc: [false, [Validators.requiredTrue]]
    }, {
      updateOn: 'blur',
      validators: [CustomValidator.validateDate]
    });

    this.passedBooking = history.state.book;
    this.getBookingData();
  }

  getBookingData() {
    if (this.passedBooking) {

      // Dynamically add passport if it's present
      if (this.passedBooking.passport) {
        this.addPassport();
      }

      this.BookingForm.patchValue({
        passport: this.passedBooking.passport,
        roomId: this.passedBooking.roomId,
        guestEmail: this.passedBooking.guestEmail,
        checkinDate: new Date(this.passedBooking.checkinDate),
        checkoutDate: new Date(this.passedBooking.checkoutDate),
        bookingStatus: this.passedBooking.bookingStatus,
        bookingAmount: this.passedBooking.bookingAmount,
        bookingDate: new Date(this.passedBooking.bookingDate),
        mobileNumber: this.passedBooking.mobileNumber,
        guestName: this.passedBooking.guestName,
        address: {
          addressLine1: this.passedBooking.address?.addressLine1 ?? '',
          addressLine2: this.passedBooking.address?.addressLine2 ?? '',
          City: this.passedBooking.address?.city ?? '',
          State: this.passedBooking.address?.state ?? '',
          Country: this.passedBooking.address?.country ?? '',
          ZipCode: this.passedBooking.address?.zipCode ?? ''
        },
        tnc: this.passedBooking.tnc
      });

      // Clear guest array
      this.guests.clear();

      // Populate guestForm
      if (Array.isArray(this.passedBooking.guestForm)) {
        this.passedBooking.guestForm.forEach((guest: any) => {
          this.guests.push(this.fb.group({
            guestName: [guest.guestName],
            age: [guest.age]
          }));
        });
      }
    }
  }

  get guests() {
    return this.BookingForm.get('guestForm') as FormArray;
  }

  addGuest() {
    this.guests.push(this.AddGuestControl());
  }

  AddGuestControl() {
    return this.fb.group({
      guestName: ['', Validators.required],
      age: new FormControl('')
    });
  }

  RemoveGuest(ind: number) {
    this.guests.removeAt(ind);
  }

  addPassport() {
    if (!this.BookingForm.get('passport')) {
      this.BookingForm.addControl('passport', new FormControl(''));
    }
  }

  deletePassport() {
    if (this.BookingForm.get('passport')) {
      this.BookingForm.removeControl('passport');
    }
  }

  EditBooking() {
    console.log(this.BookingForm.getRawValue());

    this.bookingService.updateBookroom(this.BookingForm.getRawValue()).pipe(
      tap(() => {
        this.bookingService.triggerRefresh();
      }),
      switchMap(() => this.router.navigateByUrl('/ds/booking/see'))
    ).subscribe();
  }
}
