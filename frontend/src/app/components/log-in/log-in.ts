import { Component, inject, ChangeDetectorRef, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserInfo } from "../../interfaces/user-info";
import { UserService } from "src/app/services/user-service";

@Component({
  selector: "app-log-in",
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="logInForm" (submit)="checkIfUserExist()">
        <label>Nomber: <input type="text" formControlName="name" /></label>
        <label
          >Contraseña: <input type="password" formControlName="password"
        /></label>
        <button type="submit">Submit</button>
      </form>
    </section>
  `,
  styles: ``,
})
export class LogIn {
  userService: UserService = inject(UserService);
  userInfo: UserInfo | undefined;
  changeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  constructor() {
    //   private ref: ChangeDetectorRef,
    //   private router: Router,
    // ) {
    //   this.changeDetectorRef = ref;
    //   this.router = router;
  }

  logInForm = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
  });

  async checkIfUserExist() {
    const user: UserInfo = {
      _id: "",
      name: this.logInForm.value.name ?? "",
      password: this.logInForm.value.password ?? "",
      admin: false,
    };
    this.userService.logIn(user).then((userInfo: UserInfo) => {
      this.userInfo = userInfo;
      this.changeDetectorRef.markForCheck();
      console.log(this.userInfo);
      if (this.userInfo === undefined) {
        console.log("Credenciales incorrectas");
        alert("Credenciales incorrectas");
      } else {
        //console.log("Credenciales correctas");
        //console.log(userInfo);
        this.userService.addUserToSessionStorage(this.userInfo);
        this.router.navigate(["home"]);
      }
    });
  }
}
