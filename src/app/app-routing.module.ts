import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: HomeComponent},
  {path: "admin", component: AdminTemplateComponent, children: [
    {path: "products", component: ProductsComponent},
    {path: "categories", component: CategoriesComponent},
    {path: "usres", component: UsersComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
