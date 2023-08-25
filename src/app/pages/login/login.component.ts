import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private router : Router,
    private activatedRoute: ActivatedRoute
    ){
    console.log(this.activatedRoute)
  }


  ngOnInit(): void {
  }

 async register(){
    await this.router.navigate(['register'])
  }



}
