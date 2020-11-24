import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';


const routes: Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'pais/:name', component: DetailsComponent }
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
