import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../classes/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  password_verify: string = '';

  constructor(private userService: UsersService,private router:Router) { }


  private user: User = { username: '', password: '' ,myBook:[]};

  submit() {
    this.user.password = this.password
    this.user.username = this.username

    this.userService.addUser(this.user).subscribe(res => {
      this.userService.setCur(this.username,this.password)
      this.router.navigate(['all'])
    },
      err => {
        console.log(err);
      }
    )
  }

  get isPasswordMismatch(): boolean {
    return (
      this.password != '' &&
      this.password_verify != '' &&
      this.password !== this.password_verify
    );
  }
}
