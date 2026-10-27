import { Component, computed, input, output } from "@angular/core";
import { PaginationControls } from "./pagination-controls.model";

@Component({
  selector: "app-pagination-controls",
  templateUrl: "./pagination-controls.html",
})
export class PaginationControlsComponent {
  public readonly controls = input.required<PaginationControls>();
  public readonly pageChange = output<number>();
  public readonly previousPage = output<void>();
  public readonly nextPage = output<void>();

  public readonly pages = computed(() => {
    const { page, totalPages } = this.controls();
    const count = Math.min(4, totalPages);
    const start = Math.min(Math.max(1, page - 1), totalPages - count + 1);

    return Array.from({ length: count }, (_, index) => start + index);
  });
}
