import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutComponent } from '@chill-viking/layout';

describe('ChillVikingLayoutComponent', () => {
  let component: ChillVikingLayoutComponent;
  let fixture: ComponentFixture<ChillVikingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChillVikingLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillVikingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
