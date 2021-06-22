import { ReadingListCartService } from './../../services/reading-list-cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReadingList } from 'src/app/models/readingList';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { ReadingListItems } from 'src/app/models/readingListItems';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {

  readingList : ReadingList[] = []

  constructor(private readingListService: ReadingListService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService, private readingListCartService :ReadingListCartService) { }

  ngOnInit(): void {
    this.getListItemsFromDb()
    this.getReadingList()
  }

  getListItemsFromDb() {
    let userId = parseInt(this.localStorageService.getItem("userId")!!)
    this.readingListService.getAllItemsFromDb(userId).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        ReadingListItems.push(response.data[i])
      }
    })
  }

  getReadingList() {
    this.readingList = this.readingListCartService.getAllItems();
  }

  removeItem(readingList: ReadingList) {
    
    this.readingListService.removeFromDb(readingList).subscribe(response => {
   
      this.toastrService.info(response.message);
      if(response.success) {
        this.readingListCartService.removeItem(readingList);
      }

      //window.location.reload();
    })
  }

}
