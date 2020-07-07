export interface TableDataItem {
  id: string;
  platform: string;
  company: string;
  leads: number;
  revenue: number;
  rpl: number;
}

export type TableData = TableDataItem[];
