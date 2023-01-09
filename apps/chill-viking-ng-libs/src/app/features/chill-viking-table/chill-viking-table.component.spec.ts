import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChillVikingTableComponent } from './chill-viking-table.component';

type Model = {
  name: string;
  description: string;
  nullable?: string;
};

describe('ChillVikingTableComponent', () => {
  let component: ChillVikingTableComponent<Model>;
  let fixture: ComponentFixture<ChillVikingTableComponent<Model>>;

  const model: Model = { name: 'hello', description: 'world' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillVikingTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillVikingTableComponent<Model>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = { items: [{ ...model }] };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('when no meta data provided', () => {
    beforeEach(() => {
      component.data = {
        items: [{ ...model }, { ...model, nullable: 'value' }],
      };
      fixture.detectChanges();
    });

    it('should default columns', () => {
      expect(component.columns).toEqual([
        { key: 'name', title: 'Name' },
        { key: 'description', title: 'Description' },
        { key: 'nullable', title: 'Nullable' },
      ]);
    });

    it('should default displayed columns', () => {
      expect(component.displayedColumns).toEqual([
        'name',
        'description',
        'nullable',
      ]);
    });

    it('should have clear table caption', () => {
      expect(component.tableCaption).toBeFalsy();
    });
  });

  describe('when meta is provided', () => {
    beforeEach(() => {
      component.data = {
        items: [],
        meta: {
          columns: { name: 'Different Title' },
          tableCaption: 'A table',
        },
      };
      fixture.detectChanges();
    });

    it('should have correct columns', () => {
      expect(component.columns).toEqual([
        { key: 'name', title: 'Different Title' },
      ]);
    });

    it('should have correct displayed columns', () => {
      expect(component.displayedColumns).toEqual(['name']);
    });

    it('should have caption', () => {
      expect(component.tableCaption).toEqual('A table');
    });
  });
});
