import { Injectable } from "@angular/core";
import { UserInfo } from "../interfaces/user-info";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = "http://localhost:3000/users";

  async logIn(user: UserInfo): Promise<UserInfo> {
    return await fetch(`${this.url}/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        return data[0];
      })
      .catch((error) => console.error(error));
  }

  addUserToSessionStorage(user: UserInfo) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getUserFromSessionStorage(): UserInfo | null {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}
