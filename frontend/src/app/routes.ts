import { Routes } from "@angular/router";
import { Home } from "./components/home/home";
import { LogIn } from "./components/log-in/log-in";
import { ProductForm } from "./components/product-form/product-form";

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
    title: "Prodcut form page",
  },
];

export default routerConfig;
