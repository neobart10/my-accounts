import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
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
}
