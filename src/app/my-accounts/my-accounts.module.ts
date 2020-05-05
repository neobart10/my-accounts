import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MyAccountsComponent} from "./my-accounts.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DetailComponent} from "./detail/detail.component";
import {OrderAccountPipe} from "../pipes/order-account.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutesModule} from "../dashboard/dashboard-routes.module";
import {StoreModule} from "@ngrx/store";
import {accountReducer} from "./account.reducer";



@NgModule({
  declarations: [
    DashboardComponent,
    MyAccountsComponent,
    StatisticsComponent,
    DetailComponent,
    OrderAccountPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature( 'account', accountReducer ),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class MyAccountsModule { }
