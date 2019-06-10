/* Service for Login */
import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ManagerloginService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = "http://localhost:64608/api";

  formModel = this.fb.group({
    UserName: ["", Validators.required],
    Password: ["", Validators.required]
  });

  login() {
    const body = {
      UserName: this.formModel.value.UserName,
      Password: this.formModel.value.Password
    };

    return this.http.post(this.BaseURI + "/Login", body);
  }
}
