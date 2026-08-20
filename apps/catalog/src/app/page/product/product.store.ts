import { inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from "./ product.model";

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
  withMethods((store) => ({
    /** Set product */
    // product.store.ts - Solo el método setProduct

    setProduct(product: Product | Partial<Product>) {
      patchState(store, (state) => ({
        ...state,
        product: state.product
          ? {
              ...state.product,
              ...product,
            }
          : (product as Product),
        isLoading: false,
        error: null,
      }));
    },

    /** Product update */
    updateProduct(changes: Partial<Product>) {
      patchState(store, (state) => ({
        ...state,
        product: state.product
          ? {
              ...state.product,
              ...changes,
            }
          : null,
      }));
    },

    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },

    // State saving
    setSaving(isSaving: boolean) {
      patchState(store, { isSaving });
    },

    // Error state
    setError(error: string | null) {
      patchState(store, { error });
    },

    // Reset product
    resetProduct(originalProduct: Product) {
      patchState(store, {
        product: structuredClone(originalProduct),
        error: null,
      });
    },
  })),
);
