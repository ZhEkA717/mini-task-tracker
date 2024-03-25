import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class HeaderService {
  private defaultNavbar = false;

  private navbar = new BehaviorSubject<boolean>(this.defaultNavbar);

  public navbar$ = this.navbar.asObservable();

  public setNavBar(newState: boolean) {
    this.navbar.next(newState);
  }
}
