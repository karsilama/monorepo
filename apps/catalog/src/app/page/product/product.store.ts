import { HttpClient } from "@angular/common/http";
import { inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { firstValueFrom, of } from "rxjs";
import { Product } from "./ product.model";
import { productAllUrl } from "./product.constant";

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
  withMethods((store, http = inject(HttpClient)) => ({
    async save(id: number, changes: Partial<Product>) {
      const product = {
        ...store.product(),
        ...(changes as Product),
      };

      patchState(store, (state) => ({
        product,
      }));

      try {
        const result = await firstValueFrom(
          http.patch(`${productAllUrl}/${id}`, product),
        );
        return of(result);
      } catch {
        patchState(store, {
          error: "Error: method not supported. Product not stored",
        });
        return of(null);
      }
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
