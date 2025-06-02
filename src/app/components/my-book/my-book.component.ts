import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Recipe } from '../../classes/Recipe';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-book',
  imports: [MatIconModule],
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent {
  constructor(private us: UsersService, private rs: RecipesService, private router: Router) { }

  myBook: string[] = [];
  book: Recipe[] = [];

  ngOnInit() {
    if (this.us.getCur() == '') {
      alert('log in!!');
      this.router.navigate(['login']);
      return;
    }

    forkJoin({
      users: this.us.getAll(),
      recipes: this.rs.getAll()
    }).subscribe(({ users, recipes }) => {
      const temp = users.find(u => u._id == this.us.getCur());
      if (temp) {
        this.myBook = temp.myBook;
        this.book = this.myBook
          .map(id => recipes.find(r => r._id === id))
          .filter(r => r !== undefined) as Recipe[];
      }
    });
    this.rs.recipesChanged.subscribe(() => { debugger; this.loadRecipes() })

  }

  showMore(id: string) {
    this.router.navigate(['/recipe', id]);
  }

  del(id: string) {
    this.myBook = this.myBook.filter(r => r !== id);

    this.us.getAll().subscribe(users => {
      const temp = users.find(u => u._id == this.us.getCur());
      if (temp) {
        temp.myBook = this.myBook;
        this.us.put(temp)
        this.loadRecipes();
      }
    });
  }

  loadRecipes() {
    this.rs.getSort().subscribe(a => this.book = a.filter(rs => this.myBook.find(i => i == rs._id)))
  }
}
