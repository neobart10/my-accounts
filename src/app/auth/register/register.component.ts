import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      pass: ['', Validators.required ],
    });
  }

  createUser() {
    if( this.registerForm.invalid ) { return; }


    Swal.fire({
      title: 'Un momento por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const { name, email, pass } = this.registerForm.value;
    this.authService.createUser(name, email, pass)
      .then( credentials => {
        console.log(credentials);
        Swal.close();
        this.router.navigate(['/']);

      })
      .catch(  err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

}
