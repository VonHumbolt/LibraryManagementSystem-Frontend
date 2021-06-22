import { DateTransformService } from './../../services/date-transform.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  
  books: Book[];
  fixedBooks: Book[];
  selectedItem: string = "1";
  searchText:string;
  isConfirmed: boolean
  isUserAdmin = false

  constructor(private bookService: BookService, private toastrService: ToastrService,
    private matDialog: MatDialog, private localStorageService: LocalStorageService,
    private authService: AuthService, private dateTransformService :DateTransformService) { }

  ngOnInit(): void {
    this.getAllBooks()
    this.getUserByEmail()
  }

  getAllBooks() {
    this.bookService.getAll().subscribe(response => {
      
      this.books = this.transformBooksReturnDate(response.data)

      this.fixedBooks = response.data;
    })
  }

  transformBooksReturnDate(books : Book[]) : Book[] {
    for (let i = 0; i < books.length; i++) {
      if(books[i].returnDate != null) {
        books[i].returnDate = this.dateTransformService.transformDate(books[i].returnDate)
      }
    }
    return books
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig()
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, dialogConfig);

    return dialogRef;

  }

  deleteBook(book: Book) { 
    this.openDialog().afterClosed().subscribe(response => {
      if(response) {
        this.bookService.delete(book).subscribe(response => {
          this.toastrService.info(response.message)  
        }, responseError => {
          this.toastrService.info("Bu İşlem için Yetkiniz Bulunmamaktadır.")
        })
      }
    })

  }

  search() {
    this.books = this.fixedBooks;
    let searchedText = this.searchText ? this.searchText.toLowerCase() : ""
    
    if(this.selectedItem=="1"){
      this.books = searchedText ? this.books.filter((b:Book) => b.bookName.toLowerCase().indexOf(searchedText) !== -1) : this.books;
     
    }else if(this.selectedItem=="2"){
      this.books = searchedText ? this.books.filter((b:Book) => b.author.toLowerCase().indexOf(searchedText) !== -1) : this.books;
    
    }else if(this.selectedItem=="3"){
      this.books = searchedText ? this.books.filter((b:Book) => b.publisher.toLowerCase().indexOf(searchedText) !== -1) : this.books;
    }else {
      this.books = searchedText ? this.books.filter((b:Book) => b.category.toLowerCase().indexOf(searchedText) !== -1) : this.books;
    }
  }

  getUserByEmail() {
    let email = this.localStorageService.getItem("email");
    
    if(email != null) {
      this.authService.getUserByEmail(email).subscribe(response => {
        this.localStorageService.setItem("userId", response.data.id.toString());
        this.getUserClaims(response.data)   
      })
    }
  }

  getUserClaims(user: User) {
    this.authService.getUserClaims(user).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].name == "admin"){
          this.isUserAdmin = true
          this.localStorageService.setItem("claim", "admin")
        }
        
      }
    })
  }
}
