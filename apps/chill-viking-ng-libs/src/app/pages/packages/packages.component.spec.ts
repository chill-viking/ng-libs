import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { ChillVikingNavigationComponent } from '../../features/chill-viking-navigation/chill-viking-navigation.component';

import { PackagesComponent } from './packages.component';

describe('PackagesComponent', () => {
  let component: PackagesComponent;
  let fixture: ComponentFixture<PackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PackagesComponent,
        MockComponent(ChillVikingNavigationComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
