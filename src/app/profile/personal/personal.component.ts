import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configService } from '../../config/config.services'
import { NotificationService } from '../../notification/notification.service'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personalForm: FormGroup;
  submitted = false;
  cancelBtndisabledFlag = true;
  saveBtndisabledFlag = true;
  getStorageEmail: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private configservice: configService,
    private notifyService: NotificationService) {
    this.personalForm = this.formBuilder.group({})
  }

  ngOnInit() {
    console.log("ngonint");
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
    this.patchValues();
  }
  get f() { return this.personalForm.controls; }

  patchValues() {
    this.getStorageEmail = localStorage.getItem("email");
    console.log("getEmail --- > ", this.getStorageEmail);
    this.configservice.getParamsConfig('getProfile?email=', this.getStorageEmail).subscribe(res => {
      console.log("res --- > ", res);
      if (res.status == true) {
        this.personalForm.disable();
        this.cancelBtndisabledFlag = false;
        let data = res.data[0];
        let values = {
          firstName: data.first_name,
          lastName: data.last_name,
          mobile: data.mobile,
          email: data.email
        }
        this.personalForm.patchValue(values);
      } else {
        console.log("error while fetching data");
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.personalForm.invalid) {
      console.log("form is invalid ---------- <> ");
      return;
    }
    if (this.cancelBtndisabledFlag == true) {
      let data = this.personalForm.value;
      console.log("data--------- > ", data);
      data.email = this.getStorageEmail;
      this.configservice.getPostConfig('updateProfile', data).subscribe(res => {
        if (res.status == true) {
          this.showToasterSuccess(res.data);
          this.personalForm.disable();
        } else {
          this.showToasterError(res.data);
        }
      })
    } else {
      console.log("onsubmit else");
    }
  }

  onReset() {
    this.submitted = false;
    if (this.cancelBtndisabledFlag == true) {
      this.personalForm.controls.firstName.reset();
      this.personalForm.controls.lastName.reset();
      this.personalForm.controls.mobile.reset();
      // this.personalForm.reset();
    }
  }
  onEdit() {
    this.saveBtndisabledFlag = true;
    this.cancelBtndisabledFlag = true;
    this.personalForm.controls.firstName.enable();
    this.personalForm.controls.lastName.enable();
    this.personalForm.controls.mobile.enable();
  }

  showToasterSuccess(message: any) {
    this.notifyService.showSuccess("Success", message)
  }

  showToasterError(message: any) {
    this.notifyService.showError("Error", message)
  }

}
