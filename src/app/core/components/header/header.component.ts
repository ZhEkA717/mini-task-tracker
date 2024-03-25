import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subscription,
  filter,
  mapTo,
  merge,
} from 'rxjs';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoading } from 'src/app/redux/selectors/task.selector';
import HeaderService from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean> = this.store.select(selectLoading);

  public isLoading$!: Observable<boolean>;

  private showLoaderEvents$!: Observable<boolean>;

  private hideLoaderEvents$!: Observable<boolean>;

  private navbarSubscription!: Subscription;

  public navbar!: boolean;

  constructor(
    public headerService: HeaderService,
    public router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.navbarSubscription = this.headerService.navbar$.subscribe((navbar) => {
      this.navbar = navbar;
    });

    this.showLoaderEvents$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveStart),
      mapTo(true),
    );
    this.hideLoaderEvents$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveEnd),
      mapTo(false),
    );

    this.isLoading$ = merge(
      this.hideLoaderEvents$,
      this.showLoaderEvents$,
    );
  }

  ngOnDestroy(): void {
    this.navbarSubscription.unsubscribe();
  }

  public toggleMenu() {
    this.headerService.setNavBar(!this.navbar);
  }
}
