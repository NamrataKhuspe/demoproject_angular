import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/image';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/advlist';
// table changes ofr story 7-12-20



declare var tinymce: any;

@Component({
  selector: 'app-tinyeditor',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinyEditorcomponent implements AfterViewInit, OnDestroy {
  // @Input() elementId: String;
  // @Input() ngModel: String;
  @Output() onEditorContentChange = new EventEmitter();

  editor: any;

  ngAfterViewInit() {
    tinymce.init({
      // selector: '#' + this.elementId,
      plugins: ['link', 'table', 'paste', 'textcolor', 'colorpicker', 'image', 'lists', 'nonbreaking', 'advlist', 'autoresize', 'code'],
      toolbar: 'code | bold italic strikethrough forecolor backcolor | link | image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | fontsizeselect | fontselect | removeformat',
      skin_url: 'assets/skins/lightgray',
      height: "200",
      advlist_number_styles: 'default,lower-alpha,lower-roman,upper-alpha,upper-roman',
      nonbreaking_force_tab: true,
      autoresize_bottom_margin: 10,
      fontsize_formats: '8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px 31px 32px 33px 34px 35px 36px',
      table_default_attributes: {
        border: '1px solid'
      },
      table_default_styles: {
        'border-collapse': 'collapse',
        'width': '100%',
        border: '1px solid'
      },
      table_responsive_width: true,

      // entity_encoding : "named",
      // readonly : true,
      // setup: editor => {

      //   this.editor = editor;
      //   editor.on('init', () => {
      //     editor.execCommand("fontName", false, "Arial");
      //     editor.execCommand("fontSize", false, '12pt');
      //     editor.execCommand(".mce-toolbar", false);


      //     editor.execCommand('ApplyOrderedListStyle', true, {
      //       'list-style-type': 'disc'
      //     });
      //     editor.execCommand('ApplyUnorderedListStyle', true, {
      //       'list-style-type': 'decimal'
      //     });

      //     //editor.setContent(this.mydata);

      //     this.setcontent('');
      //     // console.log("mydata--->" + this.ngModel);
      //     if (this.ngModel != undefined) {
      //       // tinymce.activeEditor.setMode('design');
      //       this.setcontent(this.ngModel);

      //     } else {
      //       this.setcontent('');

      //     }
      //   });
      //   editor.on('keyup change', () => {
      //     const content = editor.getContent();
      //     this.onEditorContentChange.emit(content);
      //   });
      // }
    });
  }

  setcontent(data : any) {
    // console.log("data", data, "this.elementId =", this.elementId)
    tinymce.activeEditor.setContent(data);
  }

  getPlainText() {
    return tinymce.activeEditor.getBody().textContent;
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}