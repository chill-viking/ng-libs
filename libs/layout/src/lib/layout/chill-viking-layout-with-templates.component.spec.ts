import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutModule, LayoutContext } from '../../index';
import { of } from 'rxjs';

@Component({
  template: `
    <cv-layout [data]="ctx">
      <ng-template cvHeader let-header>
        <h2>overridden-template-header</h2>
        <span class="json">{{ header | json }}</span>
      </ng-template>
      <ng-template cvFooter let-footer>
        <p>{{ footer.copyrightHolder }}</p>
        <span class="json">{{ footer | json }}</span>
      </ng-template>
    </cv-layout>
  `,
})
class HostComponent {
  ctx!: LayoutContext;
}

describe('ChillVikingLayoutComponent with Templates', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let layoutContext: LayoutContext;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillVikingLayoutModule],
      declarations: [HostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    layoutContext = {
      header: {
        title$: of('header.title'),
      },
      footer: {
        copyrightHolder: 'a dude',
      },
    };
    component.ctx = layoutContext;

    fixture.detectChanges();
  });

  const expectJsonRendered = <T>(
    templateElement: HTMLDivElement,
    expectedValue: T,
  ): void => {
    const expectedContent = JSON.stringify(expectedValue, null, 2);
    const jsonContainer = templateElement.querySelector('.json');

    expect(jsonContainer?.textContent).toContain(expectedContent);
  };

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display header from template', () => {
    const element = fixture.nativeElement.querySelector('.cv-layout-header');

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.querySelector('h2')?.textContent).toEqual(
      'overridden-template-header',
    );
    expectJsonRendered(element, layoutContext.header);
  });

  it('should display footer from template', () => {
    const element = fixture.nativeElement.querySelector('.cv-layout-footer');

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.querySelector('p')?.textContent).toContain('a dude');
    expectJsonRendered(element, layoutContext.footer);
  });
});
