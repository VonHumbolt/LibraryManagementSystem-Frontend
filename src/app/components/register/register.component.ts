import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  passwordRepeat: string

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastrService: ToastrService, private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register() {
    if(this.registerForm.valid) {

      if(this.registerForm.controls["password"].value == this.passwordRepeat){
        let registerUser = Object.assign({}, this.registerForm.value)
        this.authService.register(registerUser).subscribe(response => {
          this.toastrService.success("Kayıt İşlemi Başarılı!")
          
          let token = response.data.token;
          this.localStorageService.setItem("token", token);

          this.router.navigate([""])
        }) 
      }
    } else {
      this.toastrService.error("Lütfen tüm alanları eksiksiz doldurduğunuzdan emin olun!")
    }
  }
}
