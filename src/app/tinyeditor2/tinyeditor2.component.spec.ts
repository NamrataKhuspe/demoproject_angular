import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tinyeditor2Component } from './tinyeditor2.component';

describe('Tinyeditor2Component', () => {
  let component: Tinyeditor2Component;
  let fixture: ComponentFixture<Tinyeditor2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tinyeditor2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tinyeditor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
