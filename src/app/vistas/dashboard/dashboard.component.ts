import { Component, OnInit } from '@angular/core';
import { ListaCostumers } from 'src/app/models/listacustomers.interface';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customers:ListaCostumers[]=[];

  constructor(private api:ApiService, private router: Router, private activatedrouter: ActivatedRoute ) { }

  ngOnInit(): void {
  this.api.getAllCustomers().subscribe(data => {
    this.customers = data;
    console.log(data);
  });
  }

  editarCustomer(id:any){
    this.router.navigate(['edit', id]);
    console.log(id);
  }

  nuevoCustomer(){
    this.router.navigate(['add']);
  }

  deleteCustomer(customer:ListaCostumers){
    if(confirm("¿Está seguro que deseas eliminar este usuario?"))
    {
      this.api.deleteCustomer(Number(customer.id)).subscribe(()=>{
        window.location.reload();
      });
    }

  }

}
