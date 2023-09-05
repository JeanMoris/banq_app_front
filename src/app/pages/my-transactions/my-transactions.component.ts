import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { TransactionDto } from 'src/app/services/models';
import { TransactionService } from 'src/app/services/services';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit{


  transactions: TransactionDto[] = []

constructor(
        //    private transactionService : TransactionService,
            private helperService: HelperService,
            private http: HttpClient

  ){}

  ngOnInit(): void {
    const userId = this.helperService.userId;
    console.log(userId)
    const apiUrl = `http://localhost:8080/transactions/users/${userId}`;

    this.http.get<TransactionDto[]>(apiUrl).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
