import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create.category.component';
import { ICategory } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[];
  category: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.categories = this.initCategories();
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      panelClass : 'formFieldWidth480',
      data: {title:'',description:''}
    });

    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory === undefined || newCategory.title === undefined || newCategory.description === undefined) {
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
      panelClass : 'formFieldWidth480',
      data: selectedCategory
    });

    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory === undefined || newCategory.title === undefined || newCategory.description === undefined) {
        return;
      }
      console.log(newCategory);
      console.log('call http service post data to server');
    });
  }

  deleteCategory(selectedCategory: ICategory): void {
    console.log(selectedCategory);
    console.log('call http service and send delete request');
  }

  initCategories (): ICategory[] {
    return [
      {
        id: 1,
        title: 'Category Title 1',
        description: 'Category Description 2',
        supplierCount: 30
      },
      {
        id: 2,
        title: 'Category Title 2',
        description: 'Category Description 2',
        supplierCount: 10
      },
      {
        id: 3,
        title: 'Category Title 3',
        description: 'Category Description 3',
        supplierCount: 600
      },
      {
        id: 4,
        title: 'Category Title 4',
        description: 'Category Description 4',
        supplierCount: 100
      }
    ]
  }

}
