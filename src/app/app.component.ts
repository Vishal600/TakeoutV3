import { Component } from "@angular/core";
import { UserService } from "./shared/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "takeout";
  constructor(private userService: UserService) {
    if (localStorage.getItem("isLogin")) {
      this.userService.isLoign = true;
    }
  }
}
