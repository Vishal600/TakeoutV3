import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService ){ }

  ngOnInit() {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res) {
          this.service.formModel.reset();
          this.toastr.success('Login to Continue', 'Registration successful.');
          this.router.navigateByUrl('/login');
        }
      },
      err => {
        this.toastr.error( 'Username might already exist or values might be incorrect', 'Registration failed' );
      }
    );
  }

}
