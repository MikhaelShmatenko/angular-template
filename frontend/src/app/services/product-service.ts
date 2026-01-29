import { Injectable } from "@angular/core";
import { ProductInfo } from "../interfaces/product-info";
import { UserInfo } from "../interfaces/user-info";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = "http://localhost:3000/products";

  async addProduct(product: ProductInfo) {
    return await fetch(`${this.url}/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
  }
  async getAllProducts(): Promise<ProductInfo[]> {
    return await fetch(`${this.url}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
  }
}
