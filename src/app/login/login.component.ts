import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helper/must-match.validators';
import { HttpClient } from '@angular/common/http';
import { configService } from '../config/config.services'
import { NotificationService } from '../notification/notification.service'

// @Component({ selector: 'app', templateUrl: 'app.component.html' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: any;
  loginForm: FormGroup;
  submitted = false;
  bartrue = false;
  isPass = false;
  isMessage: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private http: HttpClient,
    private configservice: configService,
    private notifyService: NotificationService) {
    this.loginForm = this.formBuilder.group({})
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // title: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("form is invalid ---------- <> ");
      return;
    }
    var data = this.loginForm.value;
    console.log("data --- > ", data);
    this.configservice.getPostConfig('login', data).subscribe(res => {
      console.log("Login response --->>", res);
      if (res.status == false) {
        this.isPass = true;
        console.log("isPass  - > ", this.isPass);
        // this.isMessage = res.data;
        this.showToasterError(res.data);
      } else {
        this.isPass = false;
        localStorage.setItem("email", data.email);
        this.showToasterSuccess(res.data);
        this.router.navigateByUrl('/profile');
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  onRegister() {
    console.log("on register -- > ");
    this.router.navigate(['/register']);
  }

  showToasterSuccess(message: any) {
    this.notifyService.showSuccess("Success", message)
  }

  showToasterError(message: any) {
    this.notifyService.showError("Error", message)
  }

}
