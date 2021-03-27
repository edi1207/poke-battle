import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showBtn = true;
  private routeSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe( (data: RouterEvent) => {
      if (data instanceof NavigationEnd) {
        this.showBtn = data.url.includes('pokeList') ? false : true;
      }
      this.cdRef.markForCheck();
    });
  }

  deletePage(): void {
    if (localStorage.getItem('page')) {
      localStorage.removeItem('page');
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
