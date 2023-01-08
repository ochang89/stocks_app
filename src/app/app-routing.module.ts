import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStockListComponent } from './get-stock-list/get-stock-list.component';

const routes: Routes = [
  { path: '', component: GetStockListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
