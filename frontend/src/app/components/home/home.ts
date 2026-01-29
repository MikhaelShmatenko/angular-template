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

  filterResults(text: string) {
    if (!text) {
      this.filteredProductsList = this.productsList;
    } else {
      this.filteredProductsList = this.filteredProductsList.filter(
        (productsList) =>
          productsList?.name.toLowerCase().includes(text.toLowerCase()),
      );
    }
  }
}
