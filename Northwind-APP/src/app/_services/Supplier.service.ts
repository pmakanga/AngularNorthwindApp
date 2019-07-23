import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Supplier } from '../_models/supplier';

// const httpOptions = {
//     headers: new HttpHeaders({'Content-Type' : 'application/json'})
// };

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// const apiUrl = 'http://localhost:5000/api/';
const apiUrl = 'http://localhost:5000/api/Supplier';

@Injectable()
export class SupplierService {

constructor(private http: HttpClient) { }

private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSuppliers (): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(apiUrl)
      .pipe(
        tap(res => console.log('fetched Suppliers')),
        catchError(this.handleError('getSuppliers', []))
      );
  }

  // Fetch supplier by Id
  getSupplier(id: number): Observable<Supplier> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Supplier>(url).pipe
    (tap(s => console.log(`fetched Supplier id = ${id}`)),
    catchError(this.handleError<Supplier>(`getSupplier id=${id}`)));
  }

    // Add Supplier
    addSupplier(supplier: any): Observable<Supplier> {
        return this.http.post<Supplier>(`${apiUrl}`, supplier, httpOptions).pipe(
            tap((res: Supplier) => console.log(`added Supplier w/ id=${res.supplierId}`)),
            catchError(this.handleError<Supplier>('addSupplier'))
        );
    }

    // Update Supplier
  updateSupplier(id: number, supplier: any): Observable<any> {
      const url = `${apiUrl}/${id}`;
      return this.http.put(url, supplier, httpOptions).pipe
      (tap(s => console.log(`updated supplier id=${id}`)),
      catchError(this.handleError<any>('updateSupplier')));
  }


  // Delete Supplier
  deleteSupplier(id: number):Observable<Supplier> {
      const url = `${apiUrl}/${id}`;
      return this.http.delete<Supplier>(url, httpOptions).pipe
      (tap(s => console.log('deleted Supplier id=${id}')),
      catchError(this.handleError<Supplier>('deleteSupplier')));
  }

  // Find Suppliers (search, filter, paginate and sort)
  findSuppliers(
    filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Supplier[]> {
      return this.http.get(apiUrl, {
        params: new HttpParams()
          // .set('supplierId', supplierId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      }).pipe(
        map(res => res as Supplier[]))
    }

}
