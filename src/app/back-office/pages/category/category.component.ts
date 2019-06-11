import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;

  constructor() {}

  ngOnInit() {}
}
