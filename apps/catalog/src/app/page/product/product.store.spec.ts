import { TestBed } from "@angular/core/testing";
import { Product } from "./ product.model";
import { ProductService } from "./product.service";
import { PRODUCT_STATE, ProductStore, initialState } from "./product.store";

describe("ProductStore", () => {
  let store: InstanceType<typeof ProductStore>;
  let productServiceMock: jest.Mocked<Pick<ProductService, "patchProduct">>;

  const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "A product for testing",
    category: "test",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
  } as Product;

  beforeEach(() => {
    productServiceMock = {
      patchProduct: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductStore,
        { provide: ProductService, useValue: productServiceMock },
        {
          provide: PRODUCT_STATE,
          useValue: {
            ...initialState,
            product: mockProduct,
            isLoading: false,
          },
        },
      ],
    });

    store = TestBed.inject(ProductStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("initial state", () => {
    it("should initialize with the state provided by PRODUCT_STATE", () => {
      expect(store.product()).toEqual(mockProduct);
      expect(store.isLoading()).toBe(false);
      expect(store.isSaving()).toBe(false);
      expect(store.error()).toBeNull();
    });
  });

  describe("updateProduct", () => {
    it("should merge changes into the existing product", () => {
      store.updateProduct({ title: "Updated Title" });

      expect(store.product()).toEqual({
        ...mockProduct,
        title: "Updated Title",
      });
      expect(store.product()?.id).toBe(1);
      expect(store.product()?.price).toBe(100);
      expect(store.product()?.stock).toBe(20);
    });

    it("should create a product from scratch when none is loaded", () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ProductStore,
          { provide: ProductService, useValue: productServiceMock },
          {
            provide: PRODUCT_STATE,
            useValue: { ...initialState, product: null },
          },
        ],
      });
      store = TestBed.inject(ProductStore);

      const newProduct = {
        id: 99,
        title: "Brand New",
        price: 200,
      } as Partial<Product>;

      store.updateProduct(newProduct);

      expect(store.product()).toEqual(
        expect.objectContaining({ id: 99, title: "Brand New", price: 200 }),
      );
    });
  });

  describe("setLoading", () => {
    it("should update isLoading", () => {
      store.setLoading(true);
      expect(store.isLoading()).toBe(true);

      store.setLoading(false);
      expect(store.isLoading()).toBe(false);
    });
  });

  describe("setError", () => {
    it("should set and clear the error", () => {
      store.setError("something went wrong");
      expect(store.error()).toBe("something went wrong");

      store.setError(null);
      expect(store.error()).toBeNull();
    });
  });

  describe("save (success)", () => {
    it("should call the service with the updated product and update the state", async () => {
      const updatedProduct = {
        ...mockProduct,
        price: 150,
        stock: 15,
      } as Product;
      productServiceMock.patchProduct.mockResolvedValue(updatedProduct);

      const result = await store.save(1, { price: 150, stock: 15 });

      expect(productServiceMock.patchProduct).toHaveBeenCalledTimes(1);
      expect(productServiceMock.patchProduct).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, price: 150, stock: 15 }),
      );

      expect(store.product()).toEqual(updatedProduct);
      expect(store.error()).toBeNull();
      expect(result).toEqual(updatedProduct);
    });
  });

  describe("save (error)", () => {
    it("should set the error in the state when the service returns an Error", async () => {
      const errorMessage = "Could not save the product";
      productServiceMock.patchProduct.mockResolvedValue(
        new Error(errorMessage),
      );

      const result = await store.save(1, { title: "Fail" });

      expect(store.error()).toBe(errorMessage);
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe(errorMessage);
    });

    it("should keep the optimistic product update even when the service fails", async () => {
      productServiceMock.patchProduct.mockResolvedValue(new Error("boom"));

      await store.save(1, { price: 999, discountPercentage: 25 });

      expect(store.product()?.price).toBe(999);
      expect(store.product()?.discountPercentage).toBe(25);
      expect(store.error()).toBe("boom");
    });
  });
});
