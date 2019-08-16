import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../../models/base-form';
import { DictionaryFile } from '../../models/dictionary-file';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dictionary-file-form',
  templateUrl: './dictionary-file-form.component.html',
  styleUrls: ['./dictionary-file-form.component.scss']
})
export class DictionaryFileFormComponent extends BaseForm<DictionaryFile> implements OnInit {

  private file: File;

  constructor(private fb: FormBuilder) {
    super();
   }

  ngOnInit() {
    this.formGroup = this.fb.group({
      DictionaryFile: [
        this.value ? this.value.DictionaryFile : null,
        Validators.required
      ]
    });
  }

  onFileSelect(value: HTMLInputElement): void {
    this.file = value.files[0];
  }

  submit() {
    if (this.formGroup.valid) {
      this.value.DictionaryFile = this.file;
      this.valueChange.emit(this.value);
    }
  }

}
