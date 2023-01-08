import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableData, TableMeta } from './models';

@Component({
  selector: 'ng-libs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './chill-viking-table.component.html',
  styleUrls: ['./chill-viking-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChillVikingTableComponent<T> implements OnInit {
  @Input()
  data!: TableData<T>;

  displayedColumns!: string[];
  columns!: Array<{
    key: string;
    title: string;
  }>;
  dataSource!: MatTableDataSource<T>;
  tableCaption?: string;

  private camelCaseToPhrase(str: string): string {
    const words = str.split(/(?=[A-Z])/);
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private createDescription(value: T): Partial<Record<keyof T, string>> {
    const result: Partial<Record<keyof T, string>> = {};
    for (const key in value) {
      result[key] = this.camelCaseToPhrase(key);
    }

    return result;
  }

  private createColumns(): Partial<Record<keyof T, string>> {
    if (this.data.items?.length === undefined || this.data.items.length === 0) {
      throw new Error('Unable to default meta for table data without items');
    }

    return this.data.items.reduce((acc, item) => {
      return {
        ...acc,
        ...this.createDescription(item),
      };
    }, {} as Record<keyof T, string>);
  }

  private createDefaultMeta(): TableMeta<T> {
    const columns = this.createColumns();

    return {
      columns,
      displayColumns: Object.keys(columns),
    };
  }

  private getKeys<U extends object>(o: U): Array<keyof U> {
    return Object.keys(o) as Array<keyof U>;
  }

  ngOnInit(): void {
    if (!this.data) throw new Error('[data] input required to view table');

    const meta = this.data.meta || this.createDefaultMeta();

    const columns = meta.columns || this.createColumns();
    this.columns = this.getKeys(columns).map((key) => ({
      key: key as string,
      title: columns[key] ?? `Unknown [${key as string}]`,
    }));
    this.displayedColumns = meta.displayColumns || Object.keys(columns);
    this.tableCaption = meta.tableCaption;
    this.dataSource = new MatTableDataSource<T>(this.data.items);
  }
}
