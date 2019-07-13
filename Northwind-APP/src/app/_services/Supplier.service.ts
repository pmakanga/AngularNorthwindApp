import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Supplier } from '../_models/supplier';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

const apiUrl = 'http://localhost:5000/api/';

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

  // Fetch all suppliers
  getSuppliers(): Observable<Supplier[]> {
      return this.http.get<Supplier[]>(apiUrl)
        .pipe(tap(s => console.log('Fetched Suppliers')),
        catchError(this.handleError('getSuppliers', [])));
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
        return this.http.post<Supplier>(apiUrl, supplier, httpOptions).pipe(
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

}
