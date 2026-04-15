import { Injector, Type } from "@angular/core";
export interface ListLine {
  key: string;
  value: string | undefined;
}
export type ListRowContext = Record<string, unknown>;
export interface ListRow {
  id: string;
  lines: ListLine[];
  injector?: Injector | undefined;
  component: Type<unknown> | null;
  metadata: ListRowContext;
}
export interface List {
  rows: ListRow[];
  id: string;
}
