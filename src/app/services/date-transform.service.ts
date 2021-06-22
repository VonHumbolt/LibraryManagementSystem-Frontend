import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTransformService {

  constructor(private datePipe: DatePipe) { }
  
  transformDate(date: string) : string {
    let convertedDate = new Date(date)
    let newDate = this.datePipe.transform(convertedDate, "dd-MM-yyyy")
    return newDate!!
  }
}
