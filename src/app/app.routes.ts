import { Routes } from '@angular/router';
import { ProductList } from './Components/Product-List/product-list.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/register/register';


export const routes: Routes = [
  { path: '', component: ProductList },
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent}
];
