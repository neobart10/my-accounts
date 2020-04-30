import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import * as ui from "../../shared/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;



  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      pass: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => {
        this.loading = ui.isLoading;
        console.log('Cargando');
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if( this.loginForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Un momento por favor!',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { email, pass } = this.loginForm.value;
    this.authService.loginUser( email, pass )
      .then( credentials => {
        console.log(credentials);
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        {
          this.store.dispatch( ui.stopLoading() );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        }
      } );
  }

}
