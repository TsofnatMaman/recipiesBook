import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //   private users: User[] = [
  //     {
  //       id: 0,
  //       userName: 'Tsofnat Maman',
  //       password: '1234',
  //     },
  //     {
  //       id: 1,
  //       userName: 'Shira Taieb',
  //       password: '1111',
  //     },
  //     {
  //       id: 2,
  //       userName: 'Reut Ovadya {chalimi}',
  //       password: '2222',
  //     },
  //   ];
  //   getUsers() {
  //     return this.users;
  //   }

  //   addUser(user: User) {
  //     user.id = this.id;
  //     this.id++;
  //     this.users.push(user);
  //     this.setCur(user.userName, user.password);
  //   }

  private curUser: string = '';
  // private arr: User[] = []

  private url: string = 'http://localhost:3001/users/';
  favoriteCount: number = 0

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user)
  }

  getCur() {
    return this.curUser;
  }

  setCur(userName: string, password: string) {
    const params = new HttpParams()
      .set('username', userName)
      .set('password', password)

    this.http.get<User>(this.url + 'login', { params })
      .subscribe(r => {
        if (r) {
          this.favoriteCount = r.myBook.length
          this.curUser = r._id!;
          this.router.navigate(['all']);
        } else {
          this.router.navigate(['signup']);
        }

      })

  }

  private temp: User = { myBook: [], password: '', username: '' }
  addToBook(id: string): Observable<void> {
    if (this.curUser != '') {
      this.getAll().subscribe(a => {
        this.temp = a.find(u => u._id == this.curUser)!
        if (this.temp.myBook.find(r => r == id)) {
          this.temp.myBook = this.temp.myBook.filter(r => r != id)
          this.favoriteCount--;
        }
        else {
          this.temp.myBook.push(id)
          this.favoriteCount++;
        }
        console.log(this.favoriteCount);

        this.http.put<User>(this.url + this.curUser, this.temp).subscribe(res => { console.log(res) })
      },
        err => { console.log(err); }
      )
    }
    else {
      alert('log in!')
    }
    return new Observable<void>
  }

  put(user: User) {
    this.http.put<User>(this.url + this.curUser, user).subscribe(res => { console.log(res) })
  }

  logout() {
    this.curUser = ''
  }

  constructor(private router: Router, private http: HttpClient) { }
}
