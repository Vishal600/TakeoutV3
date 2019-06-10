import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: any;
  constructor(private data: DataService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.data.getMenu().subscribe(items => (this.items = items));
  }

  goAdd() {
    this.router.navigate(['addItem']);
  }

  delete(id) {
    this.data.deleteItem(id).subscribe(data => {
      if (data) {
        this.data.getMenu().subscribe(dd => (this.items = dd));
        this.toastr.warning('The Item has been deleted from the Menu. You can always add it back from the *add an item* page', 'Deleted!');
      }
    });
  }
}
