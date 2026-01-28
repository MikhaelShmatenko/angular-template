import { Routes } from "@angular/router";
import { Home } from "./components/home/home";
import { LogIn } from "./components/log-in/log-in";

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
];

export default routerConfig;
