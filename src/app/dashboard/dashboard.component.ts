import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../app.reducer";
import {filter} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {AccountService} from "../services/account.service";
import  * as accountAction from "../my-accounts/account.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  accountSubs: Subscription;

  constructor( private store: Store<AppState>, private accountService: AccountService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) =>  {
        this.accountSubs = this.accountService.initAccounts(user.uid)
          .subscribe( accountsFB => {
            this.store.dispatch( accountAction.setItems( { items: accountsFB } ) )
          })
      });
  }

  ngOnDestroy(): void {
    this.accountSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
