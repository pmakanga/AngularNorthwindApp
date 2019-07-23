
import { Supplier } from '../_models/supplier';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SupplierService } from '../_services/Supplier.service';
import { catchError, finalize } from 'rxjs/operators';

export class SuppierDatasource implements DataSource<Supplier> {

    private suppliersSubject = new BehaviorSubject<Supplier[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private supplierService: SupplierService){}

    loadSuppliers(filter: string,
                  sortDirection: string,
                  pageIndex: number,
                  pageSize: number) {

            this.loadingSubject.next(true);
            
            this.supplierService.findSuppliers(filter, sortDirection, 
                pageIndex, pageSize).pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false))
                ).subscribe(res => this.suppliersSubject.next(res))
            }

    connect(collectionViewer: CollectionViewer): Observable<Supplier[]> {
        console.log("Connecting data source");
        return this.suppliersSubject.asObservable()
    }    
    disconnect(collectionViewer: CollectionViewer): void {
        this.suppliersSubject.complete();
        this.loadingSubject.complete();
    }

}
