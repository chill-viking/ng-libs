import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

@Injectable()
export class PageMetaDataService extends TitleStrategy {
  constructor(private readonly _title: Title, private readonly _meta: Meta) {
    super();
  }

  private getPrimaryNavigationChildren({
    root,
  }: Partial<RouterStateSnapshot>): ActivatedRouteSnapshot[] {
    const result: ActivatedRouteSnapshot[] = [];
    let primarySnapshot = root?.children.find((c) => c.outlet === 'primary');
    while (primarySnapshot) {
      result.push(primarySnapshot);
      primarySnapshot = primarySnapshot.children?.find(
        (c) => c.outlet === 'primary',
      );
    }

    return result;
  }

  private resolveChildTitles(
    activatedRootSnapshot: ActivatedRouteSnapshot,
  ): string[] {
    return this.getPrimaryNavigationChildren({ root: activatedRootSnapshot })
      .map((snapshot) => snapshot.title ?? '')
      .filter((title) => title !== '');
  }

  private makeCurrentTitleFirst(...arr: string[]): string[] {
    return [...arr].reverse();
  }

  updateMeta(snapshot: RouterStateSnapshot): void {
    const routes = this.getPrimaryNavigationChildren(snapshot);
    if (routes.length === 0) return;

    const data = routes[routes.length - 1].data;
    if (data === undefined || data['metaTags'] === undefined) return;

    const metaTags = data['metaTags'];
    for (const name in metaTags) {
      this._meta.updateTag({ name, content: metaTags[name] });
    }
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titles = this.makeCurrentTitleFirst(
      'Chill Viking | ng-libs',
      ...this.resolveChildTitles(snapshot.root),
    );
    this._title.setTitle(titles.join(' | '));

    this.updateMeta(snapshot);
  }
}
