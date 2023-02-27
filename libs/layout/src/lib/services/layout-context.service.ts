import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LAYOUT_OPTIONS } from '../injection-tokens';
import { LayoutOptions } from '../options';
import { Title } from '@angular/platform-browser';
import { LayoutFooterContext, LayoutHeaderContext } from '../models';

@Injectable()
export class LayoutContextService {
  private _titleSubject = new BehaviorSubject<string | undefined>(undefined);

  get header(): LayoutHeaderContext {
    return {
      title$: this._titleSubject.asObservable().pipe(
        map((title) => title ?? this._options?.defaultTitle ?? ''),
      ),
    };
  }

  get footer(): LayoutFooterContext | undefined {
    return this.hasFooter()
      ? { copyrightHolder: this._options?.copyrightHolder }
      : undefined;
  }

  constructor(
    @Optional() @Inject(LAYOUT_OPTIONS) private _options: LayoutOptions,
    @Optional() private _title: Title,
  ) {
  }

  private hasFooter(): boolean {
    return !!this._options?.copyrightHolder;
  }

  private createPageTitle(title: string) {
    if (!this._options?.pageTitleTemplate) {
      return title;
    }

    return this._options.pageTitleTemplate.split('{title}').join(title);
  }

  updateHeaderTitle(headerTitle: string): void {
    this._titleSubject.next(headerTitle);

    if (this._options.updatePageTitle) {
      this._title?.setTitle(this.createPageTitle(headerTitle));
    }
  }
}
