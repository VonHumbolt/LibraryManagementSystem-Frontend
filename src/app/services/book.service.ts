import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookForDb } from '../models/bookForDb';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl : string = "https://localhost:44335/api/books/";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Book>> {
    let url = this.apiUrl + "getBookDtos"
    return this.httpClient.get<ListResponseModel<Book>>(url);
  }

  getByBookId(bookId: number): Observable<SingleResponseModel<Book>>{
    let url = this.apiUrl + "getBookDtosByBookId/?bookId=" + bookId;
    return this.httpClient.get<SingleResponseModel<Book>>(url);
  }

  get(bookId: number) : Observable<SingleResponseModel<BookForDb>>{
    let url = this.apiUrl + "getById/?bookId="+bookId;
    return this.httpClient.get<SingleResponseModel<BookForDb>>(url);
  }

  getBookByUserId(userId: number) : Observable<ListResponseModel<BookForDb>>{
    let url = this.apiUrl + "getByUserId/?userId=" + userId;
    return this.httpClient.get<ListResponseModel<BookForDb>>(url);
  }

  getBookByAuthorId(authorId: number) : Observable<ListResponseModel<BookForDb>>{
    let url = this.apiUrl + "getByAuthorId/?authorId=" + authorId;
    return this.httpClient.get<ListResponseModel<BookForDb>>(url);
  }

  add(bookForDb : BookForDb) : Observable<ResponseModel>{
    let url = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(url, bookForDb);
  }

  update(bookForDb : BookForDb) : Observable<ResponseModel>{
    let url = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(url, bookForDb);
  }

  delete(book : Book) : Observable<ResponseModel>{
    let url = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(url, book);
  }

  addTimeExtension(bookId:number, day=20) : Observable<ResponseModel>{
    let url = this.apiUrl + "addTimeExtension/?bookId="+bookId + "&day="+day;
    return this.httpClient.post<ResponseModel>(url,{bookId, day});
  }

  borrowBook(bookId: number, userId: number) : Observable<ResponseModel>{
    let url = this.apiUrl + "borrowBook/?bookId="+bookId+"&userId="+userId;
    
    return this.httpClient.post<ResponseModel>(url, {bookId, userId});
  }

  returnBook(bookId : number) : Observable<ResponseModel> {
    let url = this.apiUrl + "returnBook/?bookId="+bookId;
    return this.httpClient.post<ResponseModel>(url, bookId);
  }
}
