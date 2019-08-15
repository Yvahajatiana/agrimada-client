import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { BaseForm } from '../../models/base-form';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent extends BaseForm<Menu> implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      MenuID: [this.value ? this.value.MenuID : 0],
      Name: [
        this.value ? this.value.Name : null,
        Validators.required
      ],
      Url: [
        this.value ? this.value.Url : null,
        Validators.required
      ],
    });
  }

}
