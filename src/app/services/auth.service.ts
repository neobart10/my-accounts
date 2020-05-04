import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as authActions from "../auth/auth.actions";
import {Subscription} from "rxjs";
import * as accountActions from "../my-accounts/account.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      //console.log(fuser);
      if( fuser ) {
        this.userSubscription =  this.firestore.doc(`${fuser.uid}/user`).valueChanges()
          .subscribe( (firestoreUser: any) => {

            const user = User.fromFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( authActions.setUser( { user } ) );

          })
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( accountActions.sunSetItems() );
      }
    });
  }

  createUser( name: string, email: string, pass: string ){
    return this.auth.createUserWithEmailAndPassword( email, pass )
      .then(({ user }) => {
        const newUser = new User( user.uid, name, user.email );
        return this.firestore.doc(`${ user.uid }/user`).set({ ...newUser } );
      });
  }

  loginUser( email: string, pass: string ) {
    return this.auth.signInWithEmailAndPassword( email, pass );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

  get user() {
    return {...this._user};
  }
}
