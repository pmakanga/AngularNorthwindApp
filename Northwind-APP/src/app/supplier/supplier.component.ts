import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../_services/Supplier.service';
import { Supplier } from '../_models/supplier';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  // variables for angular material Table Data Source
  displayColums: string[] = ['supplierId', 'companyName', 'contactName'];
  data: Supplier[] = [];
  isLoadingResults = true;
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierService.getSuppliers()
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
