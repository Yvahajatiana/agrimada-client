import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;
  addUpdateErrors: any;

  constructor() {}

  ngOnInit() {}

  submit(category: Category) {
    if (category.CategoryID === 0) {
      console.log('add');
    } else {
      console.log('update');
    }
  }
}
