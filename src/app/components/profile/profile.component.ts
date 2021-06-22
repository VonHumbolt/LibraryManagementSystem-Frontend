import { DateTransformService } from './../../services/date-transform.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookForDb } from 'src/app/models/bookForDb';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  userBooks: BookForDb[]

  constructor(private authService: AuthService, private localStorageService: LocalStorageService,
    private bookService: BookService, private toastrService: ToastrService,
    private dateTransformService :DateTransformService) { }

  ngOnInit(): void {
    this.getUserByEmail();
  }

  getUserByEmail() {
    let email = this.localStorageService.getItem("email")!!
    
    this.authService.getUserByEmail(email).subscribe(response => {
      this.user = response.data
      
      this.getBooksByUserId()
    })
    
  }
  
  getBooksByUserId(){
    this.bookService.getBookByUserId(this.user.id).subscribe(response => {
      this.userBooks = response.data
      for (let i = 0; i < this.userBooks.length; i++) {
        this.userBooks[i].remainingDay = this.calculateRemainDay(this.userBooks[i].returnDate)
        this.userBooks[i].returnDate = this.dateTransformService.transformDate(this.userBooks[i].returnDate)
      }
      
    })
  }

  calculateRemainDay(returnDate : string) : number{
    let today = new Date().getTime()
    let lastDay = new Date(returnDate).getTime()
    let remainingDay = today - lastDay
    
    let msInDay = 1000 * 3600 * 24

    return Math.ceil(remainingDay/msInDay)
  }

  addExtensionForBook(bookId: number) {
    this.bookService.addTimeExtension(bookId).subscribe(response => {
      this.toastrService.success(response.message);
      window.location.reload()
    })
  }

}
