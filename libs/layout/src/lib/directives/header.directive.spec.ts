import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutHeaderContext } from '@chill-viking/layout';
import { of } from 'rxjs';
import { HeaderDirective } from './header.directive';

@Component({
  selector: 'cv-layout-header-renderer',
  template: `
    <div id="template-render-block">
      <ng-container
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ $implicit: ctx }"
      ></ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LayoutHeaderRendererComponent {
  @ContentChild(HeaderDirective, { read: TemplateRef<LayoutHeaderContext> })
  template!: TemplateRef<LayoutHeaderContext>;
  ctx: LayoutHeaderContext = {
    title$: of('hello'),
  };
}

@Component({
  template: ` <cv-layout-header-renderer>
    <ng-template cvHeader let-header>
      <p>{{ header.title$ | async }}</p>
    </ng-template>
  </cv-layout-header-renderer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('HeaderDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderDirective,
        HostComponent,
        LayoutHeaderRendererComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // if component can be created, then directive also created.
    expect(component).toBeTruthy();
  });

  it('should be rendered correctly in component', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('#template-render-block').innerHTML).toContain(
      '<p>hello</p>',
    );
  });
});
