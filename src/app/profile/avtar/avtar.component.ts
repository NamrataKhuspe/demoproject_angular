import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { configService } from '../../config/config.services'
import { NotificationService } from '../../notification/notification.service'

@Component({
  selector: 'app-avtar',
  templateUrl: './avtar.component.html',
  styleUrls: ['./avtar.component.css']
})
export class AvtarComponent implements OnInit {

  submitted = false;
  selectedFile: any;
  getStorageEmail: any;
  avtarForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private configservice: configService,
    private notifyService: NotificationService) {
    this.avtarForm = this.formBuilder.group({
      filename: [''],
      image: [null]
    })
  }
  ngOnInit() {
    console.log("ngonint");
  }
  get f() { return this.avtarForm.controls; }

  onchange($event: any) {
    console.log('event --> ', $event.target.files)
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    // this.avtarForm.patchValue({ image: this.selectedFile });
  }

  submitForm() {
    var formData: any = new FormData();
    this.getStorageEmail = localStorage.getItem("email");
    // this.selectedFile,   
    formData.append("image", this.selectedFile);
    formData.append("email", this.getStorageEmail);
    this.configservice.getPostConfig('fileUpload', formData).subscribe(res => {
      console.log("res -- >", res);
      if (res.status == true) {
        this.showToasterSuccess(res.data);
        location.reload();
      } else {
        this.showToasterError(res.data);
      }
    })

  }
  onReset() {
    this.submitted = false;
    this.avtarForm.reset();
  }

  showToasterSuccess(message: any) {
    this.notifyService.showSuccess("Success", message)
  }

  showToasterError(message: any) {
    this.notifyService.showError("Error", message)
  }
}
