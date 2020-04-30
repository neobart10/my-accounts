import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      pass: ['', Validators.required ],
    })
  }

  loginUser() {
    if( this.loginForm.invalid ) { return; }

    Swal.fire({
      title: 'Un momento por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const { email, pass } = this.loginForm.value;
    this.authService.loginUser( email, pass )
      .then( credentials => {
        console.log(credentials);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        }
      } );
  }

}
