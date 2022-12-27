import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutComponent, HeaderDirective, LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';

const layoutContext: LayoutContext = {
  header: {
    title$: of('header.title'),
  },
};

@Component({
  template: `
    <cv-layout [data]="ctx">
      <ng-template cvHeader [context]="ctx.header" let-header>
        <h2>overridden-template-header</h2>
        <span class="data">{{ header | json }}</span>
      </ng-template>
    </cv-layout>
  `,
})
class WithTemplateComponent {
  ctx: LayoutContext = { ...layoutContext };
}

@Component({
  template: `
    <cv-layout [data]="ctx">
      <p>hello world</p>
    </cv-layout>
    <span>Outside layout</span>
  `,
})
class WithoutTemplateComponent {
  ctx: LayoutContext = { ...layoutContext };
}

const actualDeclarations: Type<unknown>[] = [
  ChillVikingLayoutComponent,
  HeaderDirective,
];

describe('ChillVikingLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ...actualDeclarations,
        WithTemplateComponent,
        WithoutTemplateComponent,
      ],
    }).compileComponents();
  });

  describe('component alone', () => {
    let component: ChillVikingLayoutComponent;
    let fixture: ComponentFixture<ChillVikingLayoutComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChillVikingLayoutComponent);
      component = fixture.componentInstance;
      component.data = { ...layoutContext };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('used without templates', () => {
    let fixture: ComponentFixture<WithoutTemplateComponent>;
    let component: WithoutTemplateComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithoutTemplateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should default header displayed', () => {
      const element = fixture.nativeElement;
      expect(
        element.querySelector('.cv-layout-header h1')?.textContent,
      ).toContain('header.title');
    });
  });

  describe('used with templates', () => {
    let fixture: ComponentFixture<WithTemplateComponent>;
    let component: WithTemplateComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithTemplateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should display header from template', () => {
      const element = fixture.nativeElement;
      expect(element.querySelector('.cv-layout-header h2').textContent).toEqual(
        'overridden-template-header',
      );
      expect(
        element.querySelector('.cv-layout-header .data').textContent,
      ).toContain(`${JSON.stringify(layoutContext.header, null, 2)}`);
    });
  });
});
