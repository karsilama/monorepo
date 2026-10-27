import { TestBed } from "@angular/core/testing";
import { ProductPaginationStore } from "./product-pagination.store";

describe("ProductPaginationStore", () => {
  let store: InstanceType<typeof ProductPaginationStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductPaginationStore],
    });
    store = TestBed.inject(ProductPaginationStore);
  });

  it("initializes with the first page and a page size of ten", () => {
    expect(store.page()).toBe(1);
    expect(store.pageSize()).toBe(10);
  });

  it("changes the page and prevents the page from dropping below one", () => {
    store.nextPage();
    expect(store.page()).toBe(2);

    store.previousPage();
    store.previousPage();
    expect(store.page()).toBe(1);

    store.setPage(3);
    expect(store.page()).toBe(3);
  });

  it("resets to the first page when the page size changes", () => {
    store.setPage(3);
    store.setPageSize(20);

    expect(store.page()).toBe(1);
    expect(store.pageSize()).toBe(20);
  });

  it("rejects invalid page values", () => {
    expect(() => store.setPage(0)).toThrow(RangeError);
    expect(() => store.setPageSize(0)).toThrow(RangeError);
  });
});
