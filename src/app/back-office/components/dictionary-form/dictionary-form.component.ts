import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { BaseForm } from '../../models/base-form';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss']
})
export class DictionaryFormComponent extends BaseForm<Dictionary> implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      DictionaryID: [this.value ? this.value.DictionaryID : 0],
      DictionaryKey: [
        this.value ? this.value.DictionaryKey : null,
        Validators.required
      ],
      DictionaryValue: [
        this.value ? this.value.DictionaryValue : null,
        Validators.required
      ],
    });
  }

}
