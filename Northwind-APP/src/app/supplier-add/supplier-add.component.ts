import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../_services/Supplier.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {

  constructor(private router: Router, private api: SupplierService, private formBuilder: FormBuilder) { }

  

  supplierForm: FormGroup;
  companyName = '';
  contactName = '';
  contactTitle = '';
  address = '';
  city = '';
  region = '';
  postalCode = '';
  country = '';
  phone = '';
  fax = '';
  homePage = '';
  isLoadingResults = false

  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      'companyName' : [null, Validators.required],
      'contactName' : [null, null],
      'contactTitle' : [null, null],
      'address' : [null, null],
      'city' : [null, null],
      'region' : [null, null],
      'postalCode' : [null, null],
      'country' : [null, null],
      'phone' : [null, null],
      'fax' : [null, null],
      'homePage' : [null, null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addSupplier(form)
      .subscribe((res: { [x: string]: any }) => {
        const supplier = res['supplierResponse'];
        const id = supplier['supplierId'];
        this.isLoadingResults = false;
        this.router.navigate(['/supplier-details', id]);
      },(err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  matcher = new MyErrorStateMatcher();

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
