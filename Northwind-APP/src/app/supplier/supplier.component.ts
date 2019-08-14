import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SupplierService } from '../_services/Supplier.service';
import { Supplier } from '../_models/supplier';
import { SuppierDatasource } from '../_datasources/suppier.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit {

  // variables for angular material Table Data Source
  displayedColumns: string[] = ['supplierId', 'companyName', 'contactName'];
  dataSourse: SuppierDatasource;
  supplier: Supplier[] = [];

  productsCount = 100;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('input', { static: true }) input: ElementRef;

  // data: Supplier[] = [];
  // isLoadingResults = true;


  constructor(private route: ActivatedRoute, private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplier = this.route.snapshot.data["supplier"];

    this.dataSourse = new SuppierDatasource(this.supplierService);

    console.log(this.dataSourse);

    this.dataSourse.loadSuppliers( '', 'asc', 0, 3);
    // this.api.getSuppliers()
    //   .subscribe(res => {
    //     this.data = res;
    //     console.log(this.data);
    //     this.isLoadingResults = false
    //   }, err => {
    //     console.log(err);
    //     this.isLoadingResults = false;
    //   });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSuppliersPage();
        })
      )
      .subscribe();

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSuppliersPage())
      ).subscribe();

       this.paginator.page.pipe(tap(() => this.loadSuppliersPage())).subscribe();
       // this.paginator.page.pipe(tap(() => this.loadSuppliersPage())).subscribe();
      
  }

  loadSuppliersPage() {
    this.dataSourse.loadSuppliers(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize)
  }

}
