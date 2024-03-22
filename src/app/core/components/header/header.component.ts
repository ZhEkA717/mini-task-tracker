import { Component, OnDestroy, OnInit } from '@angular/core';
import HeaderService from '../../services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit, OnDestroy {
  constructor(public headerService: HeaderService) {}

  private navbarSubscription!: Subscription;

  public navbar!: boolean;

  ngOnInit(): void {
    this.navbarSubscription = this.headerService.navbar$.subscribe((navbar) => {
      this.navbar = navbar;
    });
  }

  ngOnDestroy(): void {
    this.navbarSubscription.unsubscribe();
  }

  public toggleMenu() {
    this.headerService.setNavBar(!this.navbar);
  }
}
