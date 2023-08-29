import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  userDto: UserDto = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  }
  errorMessage: Array<string> = [] ;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void {
  }

  async login(){
    await this.router.navigate(['login'])
  }

  register() {
    this.errorMessage = [];
    this.authService.register({
      body: this.userDto
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['confirm-register']); // Utilisez des parenthèses ici
      },
      error: (error:any) => {
        if (Array.isArray(error.error)) {
          this.errorMessage = error.error;
        } else {
          error.error.text().then((errorMess: string) => {
             const errorObj = JSON.parse(errorMess);
            this.errorMessage = errorObj.validationErrors;
            console.log(this.errorMessage);

          });
        }
      }

    });
  }


}
