import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/users';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormGroup! : FormGroup;
  public registerFormGroup! : FormGroup;
  public errorMessage! : string;

  constructor(private fb : FormBuilder, private as : AuthenticationService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });

    this.registerFormGroup = this.fb.group({
      name : ['', Validators.required],
      familyName : ['', Validators.required],
      email : ['', Validators.required, Validators.email],
      password : ['', Validators.required, Validators.minLength(6)],
      re_passwrd : ['', Validators.required, Validators.minLength(6),]
    });
  }

  handleLogin() {
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;
    this.as.login(email, password).subscribe({
      next: (data) => {
        if (data.result) {
          console.log(data.message);
          this.as.authenticate(data.user as User);
        }
        else {
          this.errorMessage = data.message;
          console.error(data.message);
        }
      },
       error: (err) => {
        this.errorMessage = err;
        console.error(err);
       }
    })
  }

}
