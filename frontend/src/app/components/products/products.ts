import { Component, input } from "@angular/core";
import { ProductInfo } from "../../interfaces/product-info";

@Component({
  selector: "app-products",
  imports: [],
  template: `
    <section>
      <h2>{{ productInfo().name }}</h2>
      <p>
        {{ productInfo().type }}, {{ productInfo().price }},
        {{ productInfo().exclusive }}, {{ productInfo().creator.name }}
      </p>
    </section>
  `,
  styles: ``,
})
export class Products {
  productInfo = input.required<ProductInfo>();
}
