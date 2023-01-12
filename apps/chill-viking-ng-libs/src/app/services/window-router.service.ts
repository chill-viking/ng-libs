import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WindowRouterService {
  constructor(private _router: Router) {}

  navigate(commands: unknown[], extras?: NavigationExtras): void {
    this._router.navigate(commands, extras);
  }

  open(url: string): void {
    window.open(url);
  }
}
