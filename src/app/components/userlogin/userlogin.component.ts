//#region Importing
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { ClickbuttonsComponent } from '../../shared/reusable/clickbuttons/clickbuttons.component';
import { LogService } from '../../core/services/logServices/log.service';
//#endregion

@Component({
  selector: 'app-userlogin',
  imports: [MaterialModule, ReactiveFormsModule, ClickbuttonsComponent],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss',
})
export class UserloginComponent implements OnInit {
  //#region variabledeclaration

  loggroup!: FormGroup;
  loginFormGroup!: FormGroup;
  loginImagePath: string = '';
  ipaddress: string = '';
  browserused: string = '';
  IsLogged: Boolean = false;
  //#endregion

  //#region constructorclickEvent
  constructor(
    private fb: FormBuilder,
    private authservices: AuthService,
    private logservice: LogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginImagePath = ImageConstants.LOGIN_PAGE_IMAGE_URL;
  }
  //#endregion

  //#region ngOnInit
  async ngOnInit() {
    this.loginFormGroup = this.fb.group({
      UserName: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
    });

    this.ipaddress = await this.logservice.getIpAddress();
    this.browserused = await this.logservice.getBrowserDetails();
    this.getlogindetails();
  }
  //#endregion

  //#region getlogindetails
  getlogindetails() {
    try {
      this.IsLogged = this.authservices.isLoggedIn();
      if (this.IsLogged) this.router.navigate(['user']);
      else this.router.navigate(['login']);
    } catch (error) {}
  }
  //#endregion

  //#region clickEvent
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  //#endregion

  //#region LoginClick
  LoginClick = (e: any) => {
    try {
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
            if (result.ObjectStatusCode == 1) {
              const token = result.Data.Token;
              this.authservices.setToken(token);
              sessionStorage.setItem('EmployeeId', result.Data.EmployeeId);
              sessionStorage.setItem(
                'OrgnisationId',
                result.Data.OrgnisationId
              );
              sessionStorage.setItem('Role', result.Data.Role);

              //#region SaveUserLog
              this.loggroup = new FormGroup({
                UserId: new FormControl(result.Data.EmployeeId),
                BrowswerUsed: new FormControl(this.browserused),
                IdAddress: new FormControl(this.ipaddress),
                Flag: new FormControl(1),
              });
              this.logservice.InsertUserLogs(this.loggroup.value).subscribe();
              this.router.navigate(['user']);
              //#endregion
            } else {
              Swal.fire({
                title: 'Login Failed',
                text: 'UserName and Password is Incorrect..',
                icon: 'error',
                grow: false,
                confirmButtonText: 'Retry',
                confirmButtonColor: '#7066e0',
              });
            }
          });
      }
    } catch (error) {
      this.loggroup.reset();
      this.loggroup = new FormGroup({
        ClassName: new FormControl(this.constructor.name),
        MethodName: new FormControl(this.getCurrentMethodName()),
        Exception: new FormControl(error),
        SiteName: new FormControl(this.router.url),
      });
      this.logservice.saveExceptionLog(this.loggroup.value);
    }
  };
  //#endregion

  //#region getCurrentMethodName
  getCurrentMethodName(): string {
    return (
      new Error().stack?.split('at ')[12].trim().split(' ')[0] || 'Unknown'
    );
  }

  //#endregion
}
