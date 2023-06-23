import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCostumers } from 'src/app/models/listacustomers.interface';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    newDate: FormGroup;
    customer: ListaCostumers[]=[];
    idCustomer:number;
    errors: string[] = [];

  constructor(private activatedrouter:ActivatedRoute, private router:Router, private api:ApiService, private formBuilder: FormBuilder) {
    this.newDate = formBuilder.group(
      {
        id: [''],
        UserName : [''],
        Date : [''],
        PunchIn : [''],
        PunchOut : ['']
      }
    );
    this.idCustomer = +this.activatedrouter.snapshot.paramMap.get('id')!;
   }

   getControls(){
    return this.newDate.controls;
   }
   

  ngOnInit(): void {
  }

  saveCustomer(){
    if(this.newDate.invalid){
      alert('Error al llenar el formulario');
      return;
    }
    const customer: ListaCostumers = {
      id: Number(this.newDate.get('id')),
      UserName:String(this.newDate.get('UserName')?.value),
      Date : String(this.newDate.get('Date')?.value),
      PunchIn:String(this.newDate.get('PunchIn')?.value),
      PunchOut:String(this.newDate.get('PunchOut')?.value)
    };
    if(this.errors.length == 0){
      this.api.addCustomer(customer).subscribe(
        {
          error : error => {
            let errorMessage = error.status;
            if(errorMessage != 200){
              alert("error");

            }
          },
          next: data => {
            alert("ingreso registrado con éxito");
            this.router.navigate(['/dashboard']);
          }
          
        }
      );
    }else{
      console.log('error');
    }
  }


}
