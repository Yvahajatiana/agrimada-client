import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title: string;
  private subscriptions: Subscription[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.subscriptions.map((item) => item.unsubscribe());
  }

  menuClick() {
    // document.getElementById('main-panel').style.marginRight = '260px';
  }

  logout() {
    this.subscriptions.push(this.http.delete('/api/oauth/logout', {
      headers: {
        Authorization: 'AUTO'
      }
    }).subscribe((response) => response));
  }
}
