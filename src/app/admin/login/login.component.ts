import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModule } from 'src/app/shared/modules/material';
import { AuthService } from 'src/app/shared/services/api/backend/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class LoginComponent {
  loginForm!: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){

  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit(){
    if(this.loginForm.valid){
      const username = this.loginForm.controls['username'].value;
      const password = this.loginForm.controls['password'].value;
      this.subscription.add(
        this.authService.login(username, password).subscribe(res=>{
          console.log(res);
          if(res.status === 200){
            const token = res.metaData;
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);
            this.router.navigate(['/admin']);
          }
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
