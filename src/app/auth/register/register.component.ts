import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  uiSubscription: Subscription;

  loading = false;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      pass: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if( this.registerForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Un momento por favor!',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { name, email, pass } = this.registerForm.value;
    this.authService.createUser(name, email, pass)
      .then( credentials => {
        this.store.dispatch( ui.stopLoading() );
        console.log(credentials);
        // Swal.close();
        this.router.navigate(['/']);

      })
      .catch(  err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

}
