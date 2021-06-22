import { ReadingList } from './../models/readingList';
import { Injectable } from '@angular/core';
import { ReadingListItems } from '../models/readingListItems';

@Injectable({
  providedIn: 'root'
})
export class ReadingListCartService {

  constructor() { }

  addItemIntoReadingList(readingList : ReadingList) : Boolean {
    let item = ReadingListItems.find(b => b.bookId === readingList.bookId)
    
    if(item) {
      return false
    } else {
      let readingListItem = new ReadingList()
      readingListItem.id = readingList.id
      readingListItem.bookId = readingList.bookId
      readingListItem.bookName = readingList.bookName
      readingListItem.userId = readingList.userId
      ReadingListItems.push(readingListItem)

      return true
    }
  }

  removeItem(readingList : ReadingList) {
    let item: ReadingList = ReadingListItems.find(b => b.bookId === readingList.bookId)!!;
    ReadingListItems.splice(ReadingListItems.indexOf(item), 1)
  }

  getAllItems() : ReadingList[] {
    return ReadingListItems;
  }
}
