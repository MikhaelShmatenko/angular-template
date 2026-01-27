import { Routes } from "@angular/router";
import { Home } from "./components/home/home";

const routerConfig: Routes = [
  {
    path: "",
    component: Home,
    title: "Home page",
  },
];

export default routerConfig;
