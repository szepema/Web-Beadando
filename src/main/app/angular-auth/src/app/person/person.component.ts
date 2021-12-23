import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  persons: Person[];
  editPerson: Person;
  deletePerson: Person;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
      this.getPersons();
  }

  public getPersons(): void {
    this.personService.getPersons().subscribe(
      (res: Person[]) => {
        this.persons = res;
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }

  public onOpenModal(person: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addPersonModal');
    }
    else if(mode === 'edit'){
      this.editPerson = person;
      button.setAttribute('data-bs-target', '#updatePersonModal');
    }
    else if(mode === 'delete'){
      this.deletePerson = person;
      button.setAttribute('data-bs-target', '#deletePersonModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddPerson(addForm: NgForm): void{
    document.getElementById('add-person-form')?.click();
    this.personService.addPerson(addForm.value).subscribe(
      (res: Person) => {
        console.log(res);
        this.getPersons();
        addForm.reset();
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
        addForm.reset();
      }
    );
  }

  public onUpdatePerson(person: Person): void{
    this.personService.updatePerson(person).subscribe(
      (res: Person) => {
        console.log(res);
        this.getPersons();
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }

  public onDeletePerson(personId: number): void{
    document.getElementById('delete-person-form')?.click();
    this.personService.deletePerson(personId).subscribe(
      (res: void) => {
        console.log(res);
        this.getPersons();
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }
}
