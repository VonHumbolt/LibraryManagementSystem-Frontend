import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder:FormBuilder, private authService: AuthService,
    private localStorageService: LocalStorageService, private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid){
      let loggedUser = Object.assign({}, this.loginForm.value);
      this.authService.login(loggedUser).subscribe(response => {
        
        let token = response.data.token
        this.localStorageService.setItem("token", token);
        this.localStorageService.setItem("email", this.loginForm.controls["email"].value)
        
        this.router.navigate([""]);
        
      }, responseError => {
        
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Lütfen tüm alanları eksiksiz doldurunuz!")
    }
  }
}
