import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto } from 'src/app/services/models';
import { ContactsService } from 'src/app/services/services';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit{

  contacts: ContactDto = {}
  errorMessage: Array<string> = []

  constructor(
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService
  ){}
  ngOnInit(): void {
   const contactId = this.activatedRoute.snapshot.params['idContact']
    if (contactId){
      this.contactService.findById2({
        "contact-id": contactId
      }).subscribe({
        next: (data) => {
          this.contacts = data
        }
      })
    }
  }


  save() {
    this.errorMessage = []
    this.contacts.userId = this.helperService.userId;
    this.contactService.save2({
      body: this.contacts
    }).subscribe({
      next: (data) => {
        this.router.navigate(['user/my-contact-list'])
      },
      error: (err) => {
        console.log(err);
        if (err.status === 409 && err.error && err.error.errorMessage) {
          this.errorMessage = [err.error.errorMessage];
        } else if (err.status === 400 && err.error && err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors;
        } else {
          this.errorMessage = [err.error.validationErrors, err.error.errorMessage];
        }
      }

    })

  }


  async cancel(){
    await this.router.navigate(['user/my-contact-list'])
  }
}
