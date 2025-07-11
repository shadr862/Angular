import { Component, OnInit } from '@angular/core';
// import { BookingForGet } from '../booking';
// Update the path to the correct file where BookingForGet is exported
import { CommonModule } from '@angular/common';
import { BookingService } from '../service/booking.service';
import { BookingDetailsGet } from '../booking';
import { FormControl ,ReactiveFormsModule} from '@angular/forms';
import { SearchBookListPipe } from '../Custompipe/search-book-list.pipe';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../Auth/login-service/login.service';


@Component({
  selector: 'hinv-booking-list',
  imports: [CommonModule, ReactiveFormsModule, SearchBookListPipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent implements OnInit{
    BookingFormList: BookingDetailsGet[] = [];
    BookingNamefilter=new FormControl('');
    disableDelete=true;

    constructor(private BookingService:BookingService,
      private loginService:LoginService,
      private router:Router){}
  
    ngOnInit(): void {
        
       if(this.loginService.isloggedinAdmin  || this.loginService.isloggedinManager)
       {
        this.disableDelete=false
       }
       this.BookingService.refreshNeeded.subscribe(()=>{
         this.reload()
       })

       this.BookingService.getBookroom().subscribe((data)=>{
           this.BookingFormList = data;
       })
    }
    reload()
    {
      this.BookingService.getBookroom().subscribe((data)=>{
           this.BookingFormList = data;
       })
    }

    onEditBooking(book:any)
    {
      this.router.navigate(['/ds/booking','edit'],{state:{book}});
    }
    onDeleteBooking(ID:number)
    {
      this.BookingService.deleteBookroom(ID).subscribe((data)=>{
         this.BookingFormList=this.BookingFormList.filter(data=>data.bookingID!=ID)
      });
    }



}
