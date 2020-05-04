import { Injectable } from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore} from "@angular/fire/firestore";
import {Account} from "../models/account.model";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  items: Account[];

  constructor( private firestore: AngularFirestore, private authService: AuthService ) { }

  createAccount( account: Account ) {

    delete account.uid;
    return this.firestore.doc(`${ this.authService.user.uid  }/account`)
      .collection('items')
      .add( {...account });
  }

  initAccounts( uid: string ) {
    return this.firestore.collection(`${ uid }/account/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
          })
          )
        )
      );
  }

  deleteAccount( uidItem: string ) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/account/items/${ uidItem }`).delete();
  }
}
