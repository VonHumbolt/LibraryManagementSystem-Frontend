import { DateTransformService } from './../../services/date-transform.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookForDb } from 'src/app/models/bookForDb';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  user: User
  books: BookForDb[]
  email : string
  book: BookForDb

  constructor(private authService: AuthService, 
    private bookService: BookService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private routerLink: Router,
    private dateTransformService : DateTransformService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getBookByBookId(params["id"])
      }
    })
  }

  getUserByEmail(){
    this.authService.getUserByEmail(this.email).subscribe(response => {
      this.user = response.data
      if(this.user != null){
        this.getUserBooks(this.user.id);
      } else {
        this.toastrService.error("Bu emaile sahip bir kullanıcı yok")
      }
    })
  }

  getUserBooks(userId : number) {
    this.bookService.getBookByUserId(userId).subscribe(response => {
      this.books = this.transformBooksReturnDate(response.data)
    })
  }

  transformBooksReturnDate(books : BookForDb[]) : BookForDb[] {
    for (let i = 0; i < books.length; i++) {
      books[i].returnDate = this.dateTransformService.transformDate(books[i].returnDate)
    }
    return books
  }
  
  getBookByBookId(bookId: number) {
    this.bookService.get(bookId).subscribe(response => {
      this.book = response.data
      if(this.book.userId != null) {
        this.getUserBooks(this.book.userId)
      }
    })
  }

  borrowBook(){
    this.bookService.borrowBook(this.book.id, this.user.id).subscribe(response => {
      this.toastrService.success(response.message)
      this.routerLink.navigate([""])
    }, responseError => {
      this.toastrService.error(responseError.error.message);
    })
  }

  addTimeExtension(bookId: number) {
    this.bookService.addTimeExtension(bookId).subscribe(response => {
      this.toastrService.success(response.message)
    })
  }

  returnBook(bookId: number) {
    this.bookService.returnBook(bookId).subscribe(response => {
      this.toastrService.info(response.message)
    })
  }
}
