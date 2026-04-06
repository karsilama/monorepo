import { Type } from '@angular/core';
export interface ListLine {
  key: string;
  value?: string;
  component?: Type<unknown>;
}
export interface ListRow {
  id: string;
  lines: ListLine[];
  [key: string]: unknown;
}
export interface List {
  rows: ListRow[];
  id: string;
}
