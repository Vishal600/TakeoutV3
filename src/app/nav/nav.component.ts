import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'Off the Hook';

  constructor(private router: Router, public userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {}

  logout() {
    this.userService.isLoign = false;
    this.toastr.success('You are now logged out of your account.', 'Logout Successful');
    localStorage.clear();
  }
}
