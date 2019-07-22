
import { Supplier } from '../_models/supplier';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SupplierService } from '../_services/Supplier.service';
import { catchError, finalize } from 'rxjs/operators';

export class SuppierDatasource implements DataSource<Supplier> {

    private suppliers = new BehaviorSubject<Supplier[]>([]);

    private loadingSupplier = new BehaviorSubject<boolean>(false);

    private loading$ = this.loadingSupplier.asObservable();

    constructor(private supplierService: SupplierService){}

    loadSuppliers(supplierId: number,
                  filter: string,
                  sortDirection: string,
                  pageIndex: number,
                  pageSize: number) {

            this.loadingSupplier.next(true);
            
            this.supplierService.findSuppliers(supplierId, filter, sortDirection, 
                pageIndex, pageSize).pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSupplier.next(false))
                ).subscribe(res => this.suppliers.next(res))
            }

    connect(collectionViewer: CollectionViewer): Observable<Supplier[]> {
        console.log("Connecting data source");
        return this.suppliers.asObservable()
    }    
    disconnect(collectionViewer: CollectionViewer): void {
        this.suppliers.complete();
        this.loadingSupplier.complete();
    }

}
