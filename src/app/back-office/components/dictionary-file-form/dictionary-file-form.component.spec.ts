import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryFileFormComponent } from './dictionary-file-form.component';

describe('DictionaryFileFormComponent', () => {
  let component: DictionaryFileFormComponent;
  let fixture: ComponentFixture<DictionaryFileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryFileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
