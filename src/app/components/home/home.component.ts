import { Component } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from "@angular/router";
import { AsideComponent } from "../aside/aside.component";

@Component({
  selector: 'app-home',
  imports: [NavComponent,RouterOutlet,AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
