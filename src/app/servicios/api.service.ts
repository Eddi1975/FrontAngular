import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ListaCostumers } from '../models/listacustomers.interface';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
 


  url:string ="http://localhost:3050/";

  constructor(private http:HttpClient) { }
  
  getAllCustomers():Observable<ListaCostumers[]>{
    
    let direccion = this.url + "customers";
    return this.http.get<ListaCostumers[]>(direccion);
  }

  getSingleId(id:any):Observable<ListaCostumers[]>{
    let direccion = this.url + "customers/" + id;
    return this.http.get<ListaCostumers[]>(direccion);
  }

  getIdCustomer(id:number){
    let direccion = this.url + "customers/";
    return this.http.get(direccion+id);
  }

  addCustomer(newCustomer:ListaCostumers):Observable<ListaCostumers>{
    let direccion = this.url + 'customers/add';
    return this.http.post<any>(direccion, newCustomer)
  }

  putCustomer(form:ListaCostumers, id:any):Observable<ListaCostumers[]>{
    let direccion = this.url + "customers/update/"+id;
    return this.http.put<ListaCostumers[]>(direccion,form)
  }

  saveCustomer(data:any){
    let direccion = this.url + 'customers/add';
    return this.http.post(direccion, data);
  }

  deleteCustomer(id:number){
    let direccion = this.url + "customer/";
    
    return this.http.delete(direccion+id);

  }
  
}

