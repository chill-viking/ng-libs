import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { ChillVikingNavigationComponent } from './chill-viking-navigation.component';

describe('ChillVikingNavigationComponent', () => {
  let component: ChillVikingNavigationComponent;
  let fixture: ComponentFixture<ChillVikingNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChillVikingNavigationComponent,
        RouterTestingModule,
        MockModule(MatButtonModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillVikingNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
