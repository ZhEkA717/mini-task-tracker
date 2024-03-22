import { Component } from '@angular/core';
import HeaderService from '../../services/header.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export default class SidenavComponent {
  collapsed = false;

  navData = [
    {
      routeLink: 'main',
      label: 'Main',
      icon: 'home',
    },
    {
      routeLink: 'tasks',
      label: 'My tasks',
      icon: 'check_circle_outline',
    },
  ];

  constructor(public headerService: HeaderService) {}
}
