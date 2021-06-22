import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookImageService } from 'src/app/services/book-image.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm : FormGroup

  constructor(private formBuilder: FormBuilder, private bookService: BookService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createBookForm()
  }

  createBookForm() {
    this.bookForm = this.formBuilder.group({
      authorId : ["", Validators.required],
      categoryId: ["", Validators.required],
      publisherId: ["", Validators.required],
      bookName: ["",Validators.required],
      bookPage: ["", Validators.required],
      year: ["",Validators.required],
      bookLocation: ["", Validators.required],
    })
  }

  addBook() {

    if(this.bookForm.valid) {
      let bookForAdd = Object.assign({},this.bookForm.value)
      
      this.bookService.add(bookForAdd).subscribe(response => {
        this.toastrService.success(response.message);
        
        let authorId = this.bookForm.get("authorId")!!.value
        this.router.navigate(["add/image/"+authorId.toString()])
      })
    }else {
      this.toastrService.error("Lütfen tüm alanları eksiksiz doldurunuz")
    }
  }

}
