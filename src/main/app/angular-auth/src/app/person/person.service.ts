import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Person } from "./person";

@Injectable({providedIn: 'root'})
export class PersonService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }
    
    public getPersons(): Observable<Person[]> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`, {headers: headers});
    }

    public addPerson(person: Person): Observable<Person> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person, {headers: headers});
    }

    public updatePerson(person: Person): Observable<Person> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person, {headers: headers});
    }

    public deletePerson(personId: number): Observable<void> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`, {headers: headers});
    }
}