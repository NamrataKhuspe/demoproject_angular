import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configService } from '../../config/config.services'
import { MustMatch } from '../../_helper/must-match.validators';
import { NotificationService } from '../../notification/notification.service'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm: FormGroup;
  submitted = false;
  getStorageEmail: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private configservice: configService,
    private notifyService: NotificationService) {
    this.passwordForm = this.formBuilder.group({})
  }

  ngOnInit() {
    console.log("ngonint");
    this.passwordForm = this.formBuilder.group({
      currPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')

    });
  }
  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      console.log("form is invalid ---------- <> ");
      return;
    }
    var data = this.passwordForm.value;
    this.getStorageEmail = localStorage.getItem("email");
    console.log("getEmail --- > ", this.getStorageEmail);
    console.log(" data  -- > ", data);
    var body = {
      email: this.getStorageEmail,
      password: data.currPassword
    }
    this.configservice.getPostConfig('getCurrentUserPass', body).subscribe(res => {
      console.log("res --- > ", res);
      if (res.status == true) {
        console.log("res.data -- > ", res.data)
        var body = { password: data.confirmPassword, email: this.getStorageEmail }
        this.configservice.getPostConfig('updateProfile', body).subscribe(response => {
          console.log("res --- > ", response);
          if (res.status == true) {
            this.showToasterSuccess(response.data);
            location.reload();
            var body = {
              email: this.getStorageEmail,
              updated_password: data.confirmPassword
            }
            this.configservice.getPostConfig('sendemail', body).subscribe(emailres => {
              console.log("emailRes -> ", emailres);
            })
          } else {
            this.showToasterError(response.data);
          }
        })
      } else {
        this.showToasterError(res.data);
      }
    })


    console.log("---> on submit ");
    // this.router.navigateByUrl('/profile');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.passwordForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.passwordForm.reset();
  }

  showToasterSuccess(message: any) {
    this.notifyService.showSuccess("Success", message)
  }

  showToasterError(message: any) {
    this.notifyService.showError("Error", message)
  }

}
