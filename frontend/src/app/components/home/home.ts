import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Products } from "../products/products";
import { ProductInfo } from "../../interfaces/product-info";
import { UserInfo } from "../../interfaces/user-info";
import { ProductService } from "../../services/product-service";

@Component({
  selector: "app-home",
  imports: [Products, RouterLink, RouterOutlet],
  template: `
    <section>
      <input
        type="text"
        placeholder="Search"
        #filter
        (keyup)="filterResults(filter.value, sort.value)"
      />
      <select #sort (change)="filterResults(filter.value, sort.value)">
        <option value="name">By name</option>
        <option value="type">By type</option>
      </select>
    </section>
    <section>
      <a [routerLink]="['/productForm']">Add Product</a>
    </section>
    <section>
      @for (product of filteredProductsList; track $index) {
        <app-products [productInfo]="product" />
      }
    </section>
  `,
  styles: ``,
})
export class Home {
  productsList: ProductInfo[] = [];
  filteredProductsList: ProductInfo[] = [];
  productService: ProductService = inject(ProductService);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.productService.getAllProducts().then((productsList: ProductInfo[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
      this.changeDetectorRef.markForCheck();
      console.log(this.filteredProductsList);
    });
  }

  filterResults(text: string, filter: string) {
    if (!text) {
      this.filteredProductsList = this.productsList;
      return;
    }

    this.filteredProductsList = this.productsList.filter((product) => {
      const valueToFilter = product[filter as keyof ProductInfo];

      return String(valueToFilter).toLowerCase().includes(text.toLowerCase());
    });
    // else {
    //   this.filteredProductsList = this.filteredProductsList.filter(
    //     (productsList) =>
    //       productsList?.name.toLowerCase().includes(text.toLowerCase()),
    //   );
    // }
  }
}
