import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookForDb } from 'src/app/models/bookForDb';
import { BookImage } from 'src/app/models/bookImage';
import { BookImageService } from 'src/app/services/book-image.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book-image',
  templateUrl: './add-book-image.component.html',
  styleUrls: ['./add-book-image.component.css']
})
export class AddBookImageComponent implements OnInit {

  image: File
  url : string
  book : BookForDb
  bookImageForm: FormGroup  

  constructor(private bookImageService: BookImageService, private bookService: BookService,
    private toastrService: ToastrService, private activatedRoute : ActivatedRoute,
    private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if(param["authorId"]) {
        this.createBookImageForm()
        this.getBookByAuthorId(param["authorId"])
      }
    })
  }

  createBookImageForm() {
    this.bookImageForm = this.formBuilder.group({
      bookId:["", Validators.required],
      imagePath:["", Validators.required]
    })
  }

  getBookByAuthorId(authorId : number) {
    this.bookService.getBookByAuthorId(authorId).subscribe(response => {
      
      this.book = response.data[response.data.length-1]

      this.bookImageForm.get("bookId")?.setValue(this.book.id)
    })
  }

  onSelectFile(event: any) {
    
    if(event.target.files && event.target.files[0]) {
      this.image = event.target.files[0]
      var reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])
      
      this.bookImageForm.get("imagePath")?.setValue(this.image)

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }
  }

  addImage() {
    let formData = new FormData();
    
    if(this.image != null) {
      formData.append("image", this.bookImageForm.get("imagePath")?.value, this.image.name)
    }

    formData.append("bookId", this.bookImageForm.get("bookId")!!.value)

    this.bookImageService.addImage(formData).subscribe(response => {
      
      this.router.navigate(["/add"])
      this.toastrService.success(response.message)
    })
  }
}
