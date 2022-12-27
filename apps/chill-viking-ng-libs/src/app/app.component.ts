import { Component } from '@angular/core';
import { LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';

@Component({
  selector: 'ng-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chill-viking-ng-libs';
  data: LayoutContext = {
    header: {
      title$: of(this.title),
    },
  };
}
