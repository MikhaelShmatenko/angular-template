import { Component, input } from "@angular/core";
import { ProductInfo } from "../../interfaces/product-info";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-products",
  imports: [RouterLink, RouterOutlet],
  template: `
    <section>
      <h2>{{ productInfo().name }}</h2>
      <p>
        {{ productInfo().type }}, {{ productInfo().price }},
        {{ productInfo().exclusive }}, {{ productInfo().creator.name }}
      </p>
      <a [routerLink]="['/productDetails', productInfo()._id]">More info</a>
    </section>
  `,
  styles: ``,
})
export class Products {
  productInfo = input.required<ProductInfo>();
}
