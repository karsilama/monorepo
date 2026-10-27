import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export const ProductPaginationStore = signalStore(
  withState({ page: 1, pageSize: 10 }),
  withMethods((store) => ({
    setPage(page: number) {
      if (!Number.isInteger(page) || page < 1) {
        throw new RangeError("Page must be a positive integer.");
      }

      patchState(store, { page });
    },
    setPageSize(pageSize: number) {
      if (!Number.isInteger(pageSize) || pageSize < 1) {
        throw new RangeError("Page size must be a positive integer.");
      }

      patchState(store, { page: 1, pageSize });
    },
    nextPage() {
      patchState(store, { page: store.page() + 1 });
    },
    previousPage() {
      patchState(store, { page: Math.max(1, store.page() - 1) });
    },
  })),
);
