import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { ListaCostumers } from 'src/app/models/listacustomers.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // customer:ListaCostumers = new ListaCustomer();
  idCustomer: number=0;
  datosCustomer!:ListaCostumers;
  customer:ListaCostumers[]=[];
  newDate!:FormGroup;

  constructor(private activatedrouter:ActivatedRoute, private router:Router, private api:ApiService, private formBuilder: FormBuilder) { }

  
  editarForm = new FormGroup({
    UserName: new FormControl(''),
    Date: new FormControl(''),
    PunchIn: new FormControl(''),
    PunchOut: new FormControl('')
  });


  ngOnInit() {
    this.cargar();
    let customerid = this.activatedrouter.snapshot.paramMap.get('id')!;
    console.log(customerid);
    this.api.getSingleId(customerid).subscribe(data =>{
      this.datosCustomer = data[0];
      this.editarForm.setValue({
        'UserName': this.datosCustomer.UserName,
        'Date': this.datosCustomer.Date,
        'PunchIn': this.datosCustomer.PunchIn,
        'PunchOut': this.datosCustomer.PunchOut
      });
      
    });
    
  }

  cargar():void{
    this.activatedrouter.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.api.getSingleId(id).subscribe(
            es=>this.customer=es
          );
        }
      }
    );
  }

  update():void{
    // this.api.putCustomer(this.customer).subscribe(
    //   res=>this.router.navigate(['/dashboard/'])
    // )
  }

  postForm(form:ListaCostumers){
    this.api.putCustomer(form, this.idCustomer).subscribe(data => {
      console.log(data);
    });
  }

  // eliminar(){
  //   let datos: ListaCostumers = this.editarForm.value;
  //   this.api.deleteCustomer(datos).subscribe(data =>{
  //     console.log(data);
  //   });
  // }

}
