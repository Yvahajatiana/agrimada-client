import { Component, OnInit } from '@angular/core';
import { DashboardInfo, Notification } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardInfo: DashboardInfo;
  dataSource: MatTableDataSource<Notification>;
  displayedColumns: string[] = ['phone', 'email', 'code', 'date'];
  isLoading = true;
  $onDestroy: Subject<void>;
  constructor(private dashboard: DashboardService) {}

  ngOnInit() {
    this.initValueFromServer();
  }

  initValueFromServer() {
    this.startLoading();
    this.dashboard.getDashboardInfo().subscribe(response => {
      this.dashboardInfo = response;
      this.initTable(response);
      this.stopLoading();
    });
  }

  initTable(response: DashboardInfo) {
    this.dataSource = new MatTableDataSource<Notification>(
      response.notifications
    );
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
