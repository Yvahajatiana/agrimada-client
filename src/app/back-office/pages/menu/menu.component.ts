import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public menus: Observable<Menu[]>;
  public subscriptions: Subscription[] = [];
  public menu: Menu;
  public errors: any[];

  constructor(private menuSvc: MenuService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.menus = this.menuSvc.getAll({});
  }

  ngOnDestroy() {
    this.subscriptions.map((item) => item.unsubscribe());
  }

  initForm() {
    this.menu = {};
  }

  submited(menu: Menu) {
    if (!menu.MenuID) {
      this.subscriptions.push(this.menuSvc.add(menu).subscribe((response) => {
        this.menu = null;
        this.refresh();
      }, (error) => this.errors = error));
    } else {
      this.subscriptions.push(this.menuSvc.update(menu).subscribe((response) => {
        this.menu = null;
        this.refresh();
      }, (error) => this.errors = error));
    }
  }

  deleteMenu(menu: Menu) {
    if (confirm(`Would your realy want to delete ${menu.Name}?`)) {
      this.subscriptions.push(this.menuSvc.delete(menu.MenuID).subscribe((response) => {
        this.refresh();
      }));
    }
  }

  editMenu(menu: Menu) {
    this.menu = menu;
  }

}
