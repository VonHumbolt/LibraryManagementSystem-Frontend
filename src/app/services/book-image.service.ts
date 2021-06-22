import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookImage } from '../models/bookImage';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  api : string = "https://localhost:44335/api/bookImages/";

  constructor(private httpClient: HttpClient) { }
  
  getImageByBookId(id: number): Observable<SingleResponseModel<BookImage>>{
    let url = this.api + "getByBookId/?bookId="+id;
    return this.httpClient.get<SingleResponseModel<BookImage>>(url);
  }

  addImage(formData: FormData) : Observable<ResponseModel> {
    let url = this.api + "add";
    return this.httpClient.post<ResponseModel>(url, formData);
  }
}
