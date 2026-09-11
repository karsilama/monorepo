import { inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from "./ product.model";
import { ProductService } from "./product.service";

type ProductState = {
  product: Product | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

export const initialState: ProductState = {
  product: null,
  isLoading: true,
  isSaving: false,
  error: null,
};

export const PRODUCT_STATE = new InjectionToken<ProductState>(`ProductState`, {
  factory: () => initialState,
});

export const ProductStore = signalStore(
  withState(() => inject(PRODUCT_STATE)),
  withMethods((store, productService = inject(ProductService)) => ({
    async save(id: number, changes: Partial<Product>) {
      const product = {
        ...store.product(),
        ...(changes as Product),
      };

      patchState(store, (state) => ({
        product,
      }));

      const response = await productService.patchProduct(product);

      if (response instanceof Error) {
        patchState(store, { error: response.message });
      }

      return response;
    },

    updateProduct(changes: Partial<Product>) {
      patchState(store, (state) => ({
        product: state.product
          ? {
              ...state.product,
              ...changes,
            }
          : (changes as Product),
      }));
    },

    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },

    setError(error: string | null) {
      patchState(store, { error });
    },
  })),
);
