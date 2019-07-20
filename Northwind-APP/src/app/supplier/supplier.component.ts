import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../_services/Supplier.service';
import { Supplier } from '../_models/supplier';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  // variables for angular material Table Data Source


  displayedColumns: string[] = ['supplierId', 'companyName', 'contactName'];
  data: Supplier[] = [];
  isLoadingResults = true;


  constructor(private api: SupplierService) { }

  ngOnInit() {
    this.api.getSuppliers()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
