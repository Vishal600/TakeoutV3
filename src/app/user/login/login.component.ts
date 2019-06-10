import { Component, OnInit } from "@angular/core";
import { ManagerloginService } from "src/app/managerlogin.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    public service: ManagerloginService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.service.login().subscribe(
      () => {
        this.service.formModel.reset();
        this.toastr.success("Thanks for signing in", "Login successful.");
        this.userService.isLoign = true;
        localStorage.setItem('isLogin' , 'yes');
        this.router.navigateByUrl("");
      },
      () => {
        this.toastr.error("Incorrect Username or Password", "Login failed");
      }
    );
  }
}
