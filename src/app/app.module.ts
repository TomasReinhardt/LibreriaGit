import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routing, ModuleRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { TrolleyComponent } from './components/trolley/trolley.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditProductComponent,
    CategoryComponent,
    LoginComponent,
    ProductComponent,
    TrolleyComponent,
    CardProductComponent,
    EditProductComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [ ModuleRoutingProviders, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
