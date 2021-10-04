import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helper/must-match.validators';
import { HttpClient } from '@angular/common/http';
import { TinyEditorcomponent } from '../tiny-editor/tinyeditor.component';


// @Component({ selector: 'app', templateUrl: 'app.component.html' })
@Component({
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [TinyEditorcomponent]
})
export class EditorComponent implements OnInit {
 

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private tinyeditor: TinyEditorcomponent) {
    
  }

  ngOnInit() {
   
  }


}
