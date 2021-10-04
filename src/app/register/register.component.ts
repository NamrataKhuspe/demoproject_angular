import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helper/must-match.validators';
import { HttpClient } from '@angular/common/http';
import { configService } from '../config/config.services'
import { NotificationService } from '../notification/notification.service'


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  errorMessage: any;
  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private configservice: configService,
    private notifyService: NotificationService
  ) {
    this.registerForm = this.formBuilder.group({})
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid

    if (this.registerForm.invalid) {
      console.log("form is invalid ---------- <> ");
      return;
    }
    console.log("---> on submit ");
    var data = this.registerForm.value;
    console.log("data ---- > ", data);

    this.configservice.getPostConfig('register', data).subscribe(res => {
      console.log("response --->>", res);
      if (res.status == true) {
        this.showToasterSuccess(res.data);
        this.router.navigate(['/']);
      } else {
        this.showToasterError(res.data);
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  showToasterSuccess(message: any) {
    this.notifyService.showSuccess("Success", message)
  }

  showToasterError(message: any) {
    this.notifyService.showError("Error", message)
  }

}
