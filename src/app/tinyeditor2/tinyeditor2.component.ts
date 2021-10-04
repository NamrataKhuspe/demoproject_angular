import { Component, OnInit, ElementRef, EventEmitter, Output, Inject, ComponentRef, forwardRef, AfterViewInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/** created by sagar
 * 
 * 12-May-2018
*/


declare var tinymce: any;
const contentAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinyEditor2Component),
  multi: true
};

@Component({
  selector: 'app-tiny-editor2',
  templateUrl: './tinyeditor2.component.html',
  providers: [contentAccessor]
})
export class TinyEditor2Component implements OnInit, AfterViewInit, ControlValueAccessor {
  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.editorContent = value;
  }


  @Input() ngModel: String;
  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();

  ngOnInit() {
  }


  public editor: any;
  editorContent: string = null;

  ngAfterViewInit() {

    
    tinymce.init({

      selector: '#' + this.elementId,
      plugins: ['link', 'table', 'paste', 'code', 'textcolor', 'colorpicker', 'image'],
      toolbar: 'code | bold italic strikethrough forecolor backcolor | link | image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | fontsizeselect | fontselect | removeformat',
      skin_url: 'assets/skins/lightgray',
      height: "200",
      setup: editor => {

        this.editor = editor;
        editor.on('init', () => {
          editor.execCommand("fontName", false, "Arial");
          editor.execCommand("fontSize", false, '12pt');

          editor.execCommand(".mce-toolbar", false);

          this.setData("","");
          console.log("mydata--->" + this.ngModel);
          if (this.ngModel !=undefined) {
           
            this.setData(this.elementId,this.ngModel);

          }else{
            this.setData("","");

          }


        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    });
    // }
  }


  setData(elementid,content) {
    
    console.log('-----setData method-----')

    console.log('elementid------->',elementid);
    console.log('content--------->',content);
    tinymce.get(elementid).setContent(content);
  }
  setData2(elementid,content) {
    
    console.log('-----setData method-----')

    console.log('elementid------->',elementid);
    console.log('content--------->',content);
    tinymce.get(elementid).setContent(content);
  }
  ngOnDestroy() {
   // this.editor.initialized = false
    tinymce.remove(this.editor);
  }

}