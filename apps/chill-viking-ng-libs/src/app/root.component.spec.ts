import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootComponent } from './root.component';
import { PageMetaDataService } from './services/page-meta-data.service';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(PageMetaDataService, {
          subTitle$: of('sub-title'),
        }),
      ],
      imports: [
        RouterTestingModule,
        RootComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
