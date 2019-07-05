import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create.category.component';
import { ICategory } from './category.model';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  category: any;
  addUpdateErrors: any;
  constructor(public dialog: MatDialog, private categorySvc: CategoryService) {}

  ngOnInit() {
    // this.categories = this.initCategories();
    this.refreshCategories();
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      panelClass: 'formFieldWidth480',
      data: { title: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(newCategory => {
      if (
        newCategory === undefined ||
        newCategory.title === undefined ||
        newCategory.description === undefined
      ) {
        return;
      }
      this.category = newCategory;
      this.categories.push(newCategory);
      console.log('call http service post data to server');
    });
  }

  openEditForm(selectedCategory: ICategory): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      panelClass: 'formFieldWidth480',
      data: selectedCategory
    });

    dialogRef.afterClosed().subscribe(newCategory => {
      if (
        newCategory === undefined ||
        newCategory.title === undefined ||
        newCategory.description === undefined
      ) {
        return;
      }
      console.log(newCategory);
      console.log('call http service post data to server');
    });
  }

  deleteCategory(selectedCategory: Category): void {
    console.log(selectedCategory);
    if(confirm(`Would you realy like to delete ${selectedCategory.CategoryName}`)) {
      this.categorySvc.destroy(selectedCategory.CategoryID).subscribe((response) => {
        this.categories = this.categories.filter((item) => item.CategoryID !== response.CategoryID);
      });
    }

  }

  submit(category: Category) {
    if (category.CategoryID === 0) {
      console.log('add');
      this.categorySvc.add(category).subscribe((response) => {
        console.log(response);
        this.categories.push(response);
        this.category = null;
      }, (error) => this.addUpdateErrors = error);
    } else {
      console.log('update');
    }
  }

  refreshCategories() {
    this.categorySvc.getAll({}).subscribe((response) => this.categories = response);
  }
}
