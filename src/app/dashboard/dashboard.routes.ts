import {Routes} from "@angular/router";
import {StatisticsComponent} from "../my-accounts/statistics/statistics.component";
import {MyAccountsComponent} from "../my-accounts/my-accounts.component";
import {DetailComponent} from "../my-accounts/detail/detail.component";


export const dashboardRoutes: Routes = [

  { path: '', component: StatisticsComponent },
  { path: 'my-accounts', component: MyAccountsComponent },
  { path: 'detail', component: DetailComponent },
]
