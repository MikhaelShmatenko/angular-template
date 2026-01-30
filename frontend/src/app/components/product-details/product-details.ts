import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ProductInfo } from "../../interfaces/product-info";
import { UserInfo } from "../../interfaces/user-info";
import { ProductService } from "../../services/product-service";

@Component({
  selector: "app-product-details",
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <h2>{{ product?.name }}</h2>
      <p>
        {{ product?.type }}, {{ product?.price }}, {{ product?.exclusive }},
        {{ product?.creator?.name }}
      </p>
      <button (click)="deleteProduct()">Delete Product</button>
      <form [formGroup]="productModifyForm" (submit)="modifyProduct()">
        <label>Name: <input type="text" formControlName="name" /></label>
        <label
          >Type:
          <select formControlName="type">
            <option>Common</option>
            <option>Rare</option>
            <option>Epic</option>
          </select>
        </label>
        <label>Price: <input type="number" formControlName="price" /></label>
        <label
          >Exclusive: <input type="checkbox" formControlName="exclusive"
        /></label>
        <button type="submit">Modify Product</button>
      </form>
    </section>
  `,
  styles: ``,
})
export class ProductDetails {
  productService: ProductService = inject(ProductService);
  product: ProductInfo | undefined;
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  productId: string | undefined;
  router: Router = inject(Router);

  constructor() {
    const productId = this.route.snapshot.params["id"];
    this.productId = productId;
    this.productService
      .getProductById(productId)
      .then((productInfo: ProductInfo) => {
        this.product = productInfo;
        this.changeDetectorRef.markForCheck();
        console.log(this.product);
      });
  }
  async deleteProduct() {
    this.productService.deleteProductById(this.productId);
    this.changeDetectorRef.markForCheck();
    alert("Producto eliminado");
    this.router.navigate(["home"]);
  }

  productModifyForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    price: new FormControl(""),
    exclusive: new FormControl(null),
  });
  async modifyProduct() {
    const updateProduct = {
      name: this.productModifyForm.value.name || this.product?.name,
      type: this.productModifyForm.value.type || this.product?.type,
      price: this.productModifyForm.value.price
        ? Number(this.productModifyForm.value.price)
        : this.product?.price,
      exclusive: Boolean(this.productModifyForm.value.exclusive),
    };
    console.log(updateProduct);
    this.productService.modifyProduct(updateProduct, this.productId);
  }
}
