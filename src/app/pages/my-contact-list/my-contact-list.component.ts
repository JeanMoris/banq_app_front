import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto } from 'src/app/services/models';
import { ContactsService } from 'src/app/services/services';



@Component({
  selector: 'app-my-contact-list',
  templateUrl: './my-contact-list.component.html',
  styleUrls: ['./my-contact-list.component.scss']
})
export class MyContactListComponent implements OnInit{

  formModal: any;



  contacts: ContactDto[] = []
  userIdToDelete: any = -1;

  constructor(

              private helperService: HelperService,
              private http: HttpClient,
              private router: Router,
              private contactService: ContactsService,


    ){}

    ngOnInit(): void {
      this.findAllContactByUser();
    }

    update(id: number | undefined){
      if (id){
        this.router.navigate(['user', 'new-contact', id])
      }

    }

    delete() {
      if(this.userIdToDelete) {
        this.contactService.delete2({
          'contact-id': this.userIdToDelete
        }).subscribe({
          next: () => {
            this.findAllContactByUser();
          }
        });
      }
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

}
