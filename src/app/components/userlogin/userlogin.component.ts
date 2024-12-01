import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageConstants } from '../../core/constants/ImageConstatnt';
import { AuthService } from '../../core/services/authServices/auth.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-userlogin',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss',
})
export class UserloginComponent implements OnInit {
  //#region variabledeclaration
  loginFormGroup!: FormGroup;
  loginImagePath: string = '';
  //#endregion

  constructor(private fb: FormBuilder, private authservices: AuthService) {
    this.loginImagePath = ImageConstants.LOGIN_PAGE_IMAGE_URL;
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      UserName: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  LoginClick = (e: any) => {
    e.preventDefault();
    if (
      this.loginFormGroup.value.UserName == '' ||
      this.loginFormGroup.value.Password == ''
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'UserName and Password in Required..',
        icon: 'error',
        grow: false,
        confirmButtonText: '',
        confirmButtonColor: 'white',
      });
    } else {
      this.authservices
        .LoginUser(this.loginFormGroup.value)
        .subscribe((result: any) => {
          console.log(result);
          if (result.ObjectStatusCode == 1) {
            const token = result.Data.Token;
            this.authservices.setToken(token);
            sessionStorage.setItem('EmployeeId', result.Data.EmployeeId);
            sessionStorage.setItem('OrgnisationId', result.Data.OrgnisationId);
            sessionStorage.setItem('Role', result.Data.Role);
          } else {
          }
        });
    }
  };
}
