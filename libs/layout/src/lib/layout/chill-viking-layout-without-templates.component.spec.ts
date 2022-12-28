import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutModule, LayoutContext } from '@chill-viking/layout';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: `
    <cv-layout [data]="ctx">
      <p>hello world</p>
    </cv-layout>
    <span>Outside layout</span>
  `,
})
class HostComponent {
  ctx!: LayoutContext;
}

describe('ChillVikingLayoutComponent without Templates', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let titleSubject: BehaviorSubject<string>;
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
    titleSubject = new BehaviorSubject<string>('header.title');
    const title$ = titleSubject.asObservable();
    layoutContext = {
      header: { title$ },
    };
    component.ctx = layoutContext;
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
