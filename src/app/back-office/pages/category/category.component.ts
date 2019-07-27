import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create.category.component';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  category: any;
  addUpdateErrors: any;
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

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
      this.categoryService.create(newCategory).subscribe(response => {
        console.log(response);
      });
    });
  }

  openEditForm(selectedCategory: Category): void {
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
      this.categoryService.create(newCategory).subscribe(response => {
        console.log(response);
      });
    });
  }

  deleteCategory(selectedCategory: Category): void {
    console.log(selectedCategory);
    if (confirm(`Would you realy like to delete ${selectedCategory.title}`)) {
      this.categoryService.delete(selectedCategory.id).subscribe(response => {
        console.log(response);
      });
    }
  }

  refreshCategories() {
    this.categoryService
      .getAll()
      .subscribe(response => (this.categories = response));
  }
}
