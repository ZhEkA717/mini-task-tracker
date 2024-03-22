import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent {
  links = ['To come', 'Overdue', 'Done'];

  activeLink = this.links[0];

  changeFilter(link: string) {
    this.activeLink = link;
  }
}
