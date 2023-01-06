import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

@Injectable()
export class PageTitleStrategyService extends TitleStrategy {
  constructor(private readonly _title: Title) {
    super();
  }

  private resolveChildTitles(
    activatedRootSnapshot: ActivatedRouteSnapshot,
  ): string[] {
    if (activatedRootSnapshot.firstChild) {
      const result = [
        activatedRootSnapshot.title ?? '',
        ...this.resolveChildTitles(activatedRootSnapshot.firstChild),
      ];

      return result.filter((title) => title !== '');
    }

    return [activatedRootSnapshot.title ?? ''];
  }

  private makeCurrentTitleFirst(...arr: string[]): string[] {
    return [...arr].reverse();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titles = this.makeCurrentTitleFirst(
      'Chill Viking | ng-libs',
      ...this.resolveChildTitles(snapshot.root),
    );
    this._title.setTitle(titles.join(' | '));
  }
}
