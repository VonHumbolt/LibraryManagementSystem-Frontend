import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.isAccountOpen()
  }

  isAccountOpen() {
    let token = this.localStorageService.getItem("token");
    
    if(token != null){
      return true
    } else {
      return false;
    }
  }

  logout() {
    this.localStorageService.clear();
  
    window.location.reload();  
  }
}
