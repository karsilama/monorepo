import { JsonPipe } from "@angular/common";
import { Component, computed, inject, resource, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute, Router } from "@angular/router";
import { PushPipe } from "@ngrx/component";
import { firstValueFrom } from "rxjs";
import { AppButton } from "../../../core/button/button";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { PaginationControlsComponent } from "../pagination/pagination-controls";
import { ProductPaginationStore } from "../pagination/product-pagination.store";
import { ProductService } from "../product.service";
import { LargeFooterComponent } from "./product-all-footer";

@Component({
  selector: "product-all",
  templateUrl: "./product-all.html",
  imports: [
    MatListModule,
    AppButton,
    PushPipe,
    JsonPipe,
    PaginationControlsComponent,
    LargeFooterComponent,
  ],
  providers: [ProductPaginationStore],
})
export class ProductAll {
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public pagination = inject(ProductPaginationStore);
  private productService = inject(ProductService);

  public configuration = this.route.data;

  public productAll = resource({
    params: () => ({
      page: this.pagination.page(),
      pageSize: this.pagination.pageSize(),
    }),
    loader: ({ params }) =>
      firstValueFrom(
        this.productService.productPage(params.page, params.pageSize),
      ),
  });

  public paginationControls = computed(() => {
    const total = this.productAll.value()?.total ?? 0;
    return {
      page: this.pagination.page(),
      totalPages: Math.ceil(total / this.pagination.pageSize()),
    };
  });

  public navigateButton = signal<ButtonDefinitions>({
    innerHtml: `View/Edit`,
    type: `filled`,
  });

  public navigateTo(id: number) {
    this.router.navigate([`product/${id}`]);
  }

  public setPage(page: number) {
    this.pagination.setPage(page);
  }

  public previousPage() {
    this.pagination.previousPage();
  }

  public nextPage() {
    this.pagination.nextPage();
  }
}
