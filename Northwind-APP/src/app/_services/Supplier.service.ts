import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

const apiUrl = 'http://localhost:5000/api/';

@Injectable()
export class SupplierService {

constructor(private http: HttpClient) { }

// private handleError<T> (operation = 'operation', result?)

}
