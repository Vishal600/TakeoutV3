import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  item: any;
  itemTypes: any;
  addForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  itemTypeID = new FormControl('', [Validators.required]);
  constructor(
    private data: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      name: this.name,
      price: this.price,
      itemTypeID: this.itemTypeID
    });
    this.data.getItemTypes().subscribe(data => {
      this.itemTypes = data;
    });
  }

  save() {
    this.data.addItem(this.addForm.value).subscribe(() => {
      this.toastr.success('The Item has been added to the Menu', 'Successful!');
      this.router.navigateByUrl('/items');
    });
  }
}
