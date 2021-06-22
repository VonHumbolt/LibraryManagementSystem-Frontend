import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ReadingList } from '../models/readingList';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {

  apiUrl : string = "https://localhost:44335/api/readingLists/";

  constructor(private httpClient: HttpClient) { }

  addBookIntoDb(readingListItem : ReadingList) : Observable<ResponseModel>{
    let url = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(url, readingListItem)
  }

  removeFromDb(readingList : ReadingList) {
    let url = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(url, readingList)
  }

  getAllItemsFromDb(userId : number) : Observable<ListResponseModel<ReadingList>> {
    let url = this.apiUrl + "getByUserId/?userId=" + userId
    return this.httpClient.get<ListResponseModel<ReadingList>>(url)
  }

}
