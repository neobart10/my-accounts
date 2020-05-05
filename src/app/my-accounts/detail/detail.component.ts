import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Account} from "../../models/account.model";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import Swal from "sweetalert2";
import {AppStateWithAccount} from "../account.reducer";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  accounts: Account[] = [];
  accountsSubs: Subscription;

  constructor( private store: Store<AppStateWithAccount>, private accountService: AccountService ) { }

  ngOnInit(): void {
    this.accountsSubs = this.store.select('account').subscribe( ({ items }) => {
      this.accounts = items;
    });
  }

  ngOnDestroy(): void {
    this.accountsSubs.unsubscribe();
  }

  delete(uid: string){
    this.accountService.deleteAccount(uid)
      .then( () => Swal.fire( 'Borrado', 'Item borrado', 'success' ) )
      .catch( err => Swal.fire('Error', err.message, 'error') );
  }

}
