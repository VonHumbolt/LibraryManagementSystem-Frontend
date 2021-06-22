import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css']
})
export class NewBooksComponent implements OnInit {

  newestBooks : Book[]

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  
  getBooks(){
    this.bookService.getAll().subscribe(response => {
      this.newestBooks = response.data.slice(-5)
    })
  }
}
