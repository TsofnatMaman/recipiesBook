import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { AsideComponent } from '../aside/aside.component';
import { User } from '../../classes/User';
import { Location } from '@angular/common';
import {MatBadgeModule } from '@angular/material/badge'

@Component({
  selector: 'app-nav',
  imports: [RouterLink, MatIconModule,MatBadgeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(public us: UsersService,private location:Location) { }
  cur?: string;
  private arr: User[] = []

  ngOnInit(){
    this.us.getAll().subscribe(a=>{
      this.arr=a
    })
  }
  getCur() {
    this.cur = this.us.getCur();
    if (this.cur) {
      const temp= this.arr.find((u) => u._id == this.cur)
      return temp?.username
    }
    return 'guest';
  }
  logout() {
    this.us.logout();
  }

  goBack(){
    if(window.history.length>1){
      this.location.back()
    }
  }
}
