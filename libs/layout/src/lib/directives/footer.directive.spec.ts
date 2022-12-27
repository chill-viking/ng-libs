import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutFooterContext } from '@chill-viking/layout';
import { FooterDirective } from './footer.directive';

@Component({
  selector: 'cv-layout-footer-renderer',
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
class LayoutFooterRendererComponent {
  @ContentChild(FooterDirective, { read: TemplateRef<LayoutFooterContext> })
  template!: TemplateRef<LayoutFooterContext>;
  ctx: LayoutFooterContext = {
    copyrightHolder: 'a person',
  };
}

@Component({
  template: ` <cv-layout-footer-renderer>
    <ng-template cvFooter let-footer>
      <p>{{ footer.copyrightHolder }}</p>
    </ng-template>
  </cv-layout-footer-renderer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('FooterDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FooterDirective,
        HostComponent,
        LayoutFooterRendererComponent,
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
      '<p>a person</p>',
    );
  });
});
