import { DateTransformService } from './../../services/date-transform.service';
import { ReadingListCartService } from './../../services/reading-list-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookImage } from 'src/app/models/bookImage';
import { ReadingList } from 'src/app/models/readingList';
import { BookImageService } from 'src/app/services/book-image.service';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReadingListService } from 'src/app/services/reading-list.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookImage: BookImage;
  book : Book
  claim = false
  token : string | null

  constructor(private activatedRoute: ActivatedRoute, private bookImageService: BookImageService,
    private bookService: BookService, private readingListService: ReadingListService,
    private localStorageService: LocalStorageService, private toastrService:ToastrService,
    private readingListCartService :ReadingListCartService, private dateTransformService :DateTransformService) { }

  ngOnInit(): void {
    let isAdmin = this.localStorageService.getItem("claim")
    this.token = this.localStorageService.getItem("token")

    if(isAdmin){
      this.claim = true
    }
    this.activatedRoute.params.subscribe(param => {
      if(param["id"]){
        this.getImageByBookId(param["id"])
        this.getBookByBookId(param["id"])
      }
    })
  }

  getImageByBookId(id:number){
    this.bookImageService.getImageByBookId(id).subscribe(response => {
      this.bookImage = response.data;
    })
  }

  getBookByBookId(bookId: number) {
    this.bookService.getByBookId(bookId).subscribe(response => {
      this.book = response.data
      if(response.data.returnDate != null ) {
        this.book.returnDate = this.dateTransformService.transformDate(this.book.returnDate)
      }
    })
  }

  addBookIntoReadingList(book: Book) {

    let readingList = new ReadingList()
    readingList.bookId = book.id
    readingList.userId = parseInt(this.localStorageService.getItem("userId")!!)
    readingList.bookName = book.bookName
    
    if(this.readingListCartService.addItemIntoReadingList(readingList)) {
      console.log(readingList)
      this.readingListService.addBookIntoDb(readingList).subscribe(response => {
        this.toastrService.info(response.message)
        //window.location.reload();
      }, responseError => {
        this.toastrService.info(responseError.error.message)
      })
    } else {
      this.toastrService.error("Bu Kitap Zaten Okuma Listenizde")
    }

    
  }

}
