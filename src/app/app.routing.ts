import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { TrolleyComponent } from './components/trolley/trolley.component';
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { Error404Component } from "./components/error404/error404.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    {   path: '', component: HomeComponent},
    {   path: 'products/:category', component: CategoryComponent},
    {   path: 'product/:id', component: ProductComponent},
    {   path: 'product/:id/edit', component: EditProductComponent, canActivate: [AuthGuard]},
    {   path: 'trolley', component: TrolleyComponent},
    {   path: 'addProduct', component: AddEditProductComponent, canActivate: [AuthGuard]},
    {   path: '**', component: Error404Component}
];

export const ModuleRoutingProviders: any = [];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 