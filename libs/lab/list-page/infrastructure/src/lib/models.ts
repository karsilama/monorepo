import { Type } from '@angular/core';
export interface ListColumn {
  key: string;
  value?: string;
  component?: Type<unknown>;
}
export interface ListRow {
  id: string;
  columns: ListColumn[];
  [key: string]: unknown;
}
export interface List {
  rows: ListRow[];
  id: string;
}
