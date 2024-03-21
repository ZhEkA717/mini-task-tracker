import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export default class SidenavComponent {
  collapsed = false;
  navData = [
    {
      routeLink: 'main',
      label: 'main',
      icon: 'home'
    },
    {
      routeLink: 'tasks',
      label: 'tasks',
      icon: 'check_circle_outline'
    }
  ];

  constructor(private router: Router) {}
}
