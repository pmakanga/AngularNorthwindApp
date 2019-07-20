import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../_services/Supplier.service';
import { Supplier } from '../_models/supplier';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: SupplierService, private router: Router) { }

  supplier: Supplier = {
    supplierId: null,
    companyName: '',
    contactName: '',
    contactTitle: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: '',
    homePage: ''
  };
  isLoadingResults = true;

  getSupplierDetails(id) {
    this.api.getSupplier(id)
      .subscribe(data => {
        this.supplier = data;
        console.log(this.supplier);
        this.isLoadingResults = false;
      });
  }

  deleteSupplier(id: number) {
    this.isLoadingResults = true;
    this.api.deleteSupplier(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/supplier']);
      }, 
        (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      )
  }

  ngOnInit() {
    this.getSupplierDetails(this.route.snapshot.params['id']);
  }

}
