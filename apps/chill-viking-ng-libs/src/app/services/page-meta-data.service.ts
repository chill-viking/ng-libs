import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LayoutContextService } from '@chill-viking/layout';

@Injectable()
export class PageMetaDataService extends TitleStrategy {
  private _subTitleSubject = new BehaviorSubject<string>('');
  subTitle$ = this._subTitleSubject.asObservable();

  constructor(
    private readonly _layoutContextSvc: LayoutContextService,
    private readonly _meta: Meta,
  ) {
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
  ): Array<{ title: string; subTitle: string }> {
    return this.getPrimaryNavigationChildren({ root: activatedRootSnapshot })
      .map((snapshot) => ({ title: snapshot.title ?? '', subTitle: snapshot.data?.['subTitle'] ?? '' }))
      .filter(({ title }) => title !== '');
  }

  private reverseArray<T>(arr: T[]): T[] {
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
    const titles = this.reverseArray(
      this.resolveChildTitles(snapshot.root),
    )[0];
    this._layoutContextSvc.updateHeaderTitle(titles?.title ?? '');
    this._subTitleSubject.next(titles?.subTitle ?? '');

    this.updateMeta(snapshot);
  }
}
