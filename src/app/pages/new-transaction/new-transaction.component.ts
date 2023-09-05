import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto, TransactionDto } from 'src/app/services/models';
import { ContactsService, StatisticService, TransactionService } from 'src/app/services/services';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit{

    transaction: TransactionDto = {
    }
  contacts: ContactDto[]
  accountBalance= 0;

  titreSelect = 'Open this select menu'
  errorMessages: Array<string> = [];


  constructor(
    private statisticService: StatisticService,
    private transactionService: TransactionService,
    private helperService: HelperService,
    private router: Router,
    private http: HttpClient

  ) {

   }

   ngOnInit(): void {
    this.findAllContactByUser();
    this.statisticService.getAccountBalance({
      "user-id": this.helperService.userId
    }).subscribe({
      next: (data) => {
        this.accountBalance = data;
      }
    })
  }

  findAllContactByUser() {
    const userId = this.helperService.userId;
    console.log(userId)
    const apiUrl = `http://localhost:8080/contacts/users/${userId}`;

    this.http.get<ContactDto[]>(apiUrl).subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async cancel() {
    await this.router.navigate(['user', 'my-transactions']);
  }

  save() {
    this.errorMessages = [];
    this.transaction.userId = this.helperService.userId;
    this.transactionService.save1({
      body: this.transaction
    }).subscribe({
      next: async () => {
        await this.router.navigate(['user', 'my-transactions']);
      },
      error: (err) => {
        console.log(err)
        this.errorMessages = err.error.validationErrors;
      }
    });
  }

  updateTransactionType(type: 'DEPOSIT' | 'TRANSFERT') {
    this.transaction.type = type;
  }

  onTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value as 'DEPOSIT' | 'TRANSFERT';
    this.updateTransactionType(selectedType);
    console.log('Selected Type:', selectedType);
  }







}
