import { Component, OnInit } from '@angular/core';
import { LightInfoInput } from 'src/app/components/light-info/light-info.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{

  accountInfoList: Array<LightInfoInput> = [];

  constructor(
  ){}

  ngOnInit(): void {
    this.initializeAccountInfo();
  }

  private initializeAccountInfo(){
    this.accountInfoList = [
      {
        title: 'Account balance',
        amount: 21500,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest transfer',
        amount: 2100,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest deposit',
        amount: 32500,
        infoStyle: 'bg-success'
      }
    ];
  }


}
