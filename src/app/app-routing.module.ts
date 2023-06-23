import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddComponent } from "./vistas/add/add.component";
import { DashboardComponent } from "./vistas/dashboard/dashboard.component";
import { EditComponent } from "./vistas/edit/edit.component";

const routes: Routes = [
    // { path:'', redirectTo:'add', pathMatch:'full' },
    { path:'add', component:AddComponent },
    { path: 'dashboard', component:DashboardComponent },
    { path: 'edit/:id', component:EditComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [AddComponent, DashboardComponent, EditComponent]