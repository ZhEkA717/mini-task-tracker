import { Component, OnInit } from '@angular/core';
import HeaderService from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  constructor(public headerService: HeaderService) {}

  public navbar!: boolean;

  ngOnInit(): void {
    this.headerService.navbar$.subscribe((navbar) => {
      this.navbar = navbar;
    });
  }

  public toggleMenu() {
    console.log('sadfasfa');
    this.headerService.setNavBar(!this.navbar);
  }
}
