import { Routes } from "@angular/router";
import { Home } from "./components/home/home";
import { LogIn } from "./components/log-in/log-in";
import { ProductForm } from "./components/product-form/product-form";
import { ProductDetails } from "./components/product-details/product-details";

const routerConfig: Routes = [
  {
    path: "",
    component: LogIn,
    title: "Log-In page",
  },
  {
    path: "home",
    component: Home,
    title: "Home page",
  },
  {
    path: "productForm",
    component: ProductForm,
    title: "Product form page",
  },
  {
    path: "productDetails/:id",
    component: ProductDetails,
    title: "Details page",
  },
];

export default routerConfig;
