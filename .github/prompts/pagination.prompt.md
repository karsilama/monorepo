/instructions

- add reusable component apps/catalog/src/page/product/pagination bellow mat-list at apps/catalog/src/page/product/all/product-all.html Ex: prev 1 [2] 3 4 next
- add ngrx signal store dependency
- create signalStore withState({ page: 1, pageSize: 10 }) withMethods setPageSize, nextPage y previousPage
- segregate interface PaginationControls
- read existing facade ProductService productAll method
