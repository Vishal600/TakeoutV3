import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  //property for login
  isLoign = false;
  //property for admin
  isAdmin = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = "http://localhost:64608/api";

  formModel = this.fb.group({
    UserName: ["", [Validators.required, Validators.maxLength(50)]],
    Passwords: this.fb.group(
      {
        Password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50)
          ]
        ],
        ConfirmPassword: ["", Validators.required]
      },
      { validator: this.comparePasswords }
    ),
    FirstName: ["", [Validators.required, Validators.maxLength(50)]],
    LastName: ["", [Validators.required, Validators.maxLength(50)]]
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get("ConfirmPassword");
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (
      confirmPswrdCtrl.errors == null ||
      "passwordMismatch" in confirmPswrdCtrl.errors
    ) {
      if (fb.get("Password").value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Password: this.formModel.value.Passwords.Password,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName
    };
    return this.http.post(this.BaseURI + "/Register", body);
  }
}
