import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ProductInfo } from "../../interfaces/product-info";
import { UserInfo } from "../../interfaces/user-info";
import { ProductService } from "../../services/product-service";
import { UserService } from "../../services/user-service";

@Component({
  selector: "app-product-form",
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="productForm" (submit)="submitProduct()">
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
        <button type="submit">Submit</button>
      </form>
    </section>
  `,
  styles: ``,
})
export class ProductForm {
  productService: ProductService = inject(ProductService);
  userService: UserService = inject(UserService);
  changeDetectorRef = inject(ChangeDetectorRef);
  userInfo: UserInfo | undefined;
  productInfo: ProductInfo | undefined;

  productForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    price: new FormControl(""),
    exclusive: new FormControl(""),
  });
  submitProduct() {
    const user = this.userService.getUserFromSessionStorage();
    if (!user) {
    } else {
      const productRequest: ProductInfo = {
        _id: "0",
        name: this.productForm.value.name ?? "",
        type: this.productForm.value.type ?? "",
        price: Number(this.productForm.value.price) ?? "",
        exclusive: Boolean(this.productForm.value.exclusive),
        creator: user,
      };
      alert("Producto añadido");
      // console.log(productRequest);
      this.productService.addProduct(productRequest);
      this.changeDetectorRef.markForCheck();
    }
  }
}
