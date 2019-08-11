import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryFormComponent } from './dictionary-form.component';

describe('DictionaryFormComponent', () => {
  let component: DictionaryFormComponent;
  let fixture: ComponentFixture<DictionaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
