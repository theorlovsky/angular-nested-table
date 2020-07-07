import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MockDataService } from '@app/mock-data';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { TableData, TableDataItem } from './table-data.interface';

export type GroupBy = [keyof TableDataItem, ...Array<keyof TableDataItem>];

@UntilDestroy()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() readonly groupBy: GroupBy = ['platform'];

  readonly tableData$: Observable<TableData>;
  readonly columns = ['name', 'leads', 'revenue', 'rpl'];

  constructor(private dataService: MockDataService) {
    this.tableData$ = this.dataService.getData().pipe(share());
  }

  trackBy(index: number, item: TableDataItem): TableDataItem['id'] {
    return item.id;
  }
}
