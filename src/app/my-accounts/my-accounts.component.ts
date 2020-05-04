import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Account} from "../models/account.model";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as action from "../shared/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styles: [
  ]
})
export class MyAccountsComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  type: string = 'income';

  loading = false;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder, private accountService: AccountService,
               private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui')
      .subscribe( ({ isLoading }) => this.loading = isLoading );

    this.accountForm = this.fb.group({
      description: ['', Validators.required ],
      amount: ['', Validators.required]
      }
    )
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  save(){

    if( this.accountForm.invalid ) return;
    this.store.dispatch( action.isLoading() );

    const { description, amount } = this.accountForm.value;
    const account = new Account( description, amount, this.type );

    this.accountService.createAccount(account)
      .then( () => {
        this.store.dispatch( action.stopLoading() );
        this.accountForm.reset();
        Swal.fire(  'Cuenta creada', description, 'success');
      } )
      .catch( err => {
        this.store.dispatch( action.stopLoading() );
        Swal.fire('Error', err.message, 'error');
      } );

  }

}
