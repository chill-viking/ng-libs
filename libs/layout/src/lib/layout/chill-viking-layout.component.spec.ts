import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutComponent } from '@chill-viking/layout';
import { first } from 'rxjs';

describe('ChillVikingLayoutComponent', () => {
  let component: ChillVikingLayoutComponent;
  let fixture: ComponentFixture<ChillVikingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChillVikingLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChillVikingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default [data]', (done) => {
    expect(component.data.header).toBeTruthy();

    component.data.header.title$.pipe(first()).subscribe((defaultTitle) => {
      expect(defaultTitle).toContain('[data] not supplied');
      done();
    });
  });
});
