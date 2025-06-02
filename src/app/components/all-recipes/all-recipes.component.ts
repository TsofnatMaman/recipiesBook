import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../classes/Recipe';
import { UsersService } from '../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { User } from '../../classes/User';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css',
})
export class AllRecipesComponent implements OnInit {
  recipies = inject(RecipesService);  // שימוש ב-inject
  arr: Recipe[] = [];  // מערך המתכונים
  vals: { name: string; dif: Number; time: Number } = {
    name: '',
    dif: 0,
    time: 0,
  };
  colorMap: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private us: UsersService) { }

  ngOnInit() {
    this.ar.url.subscribe((url) => {
      this.getAllRecipies()
      this.loadFavoriteColors()
      console.log(this.colorMap);
      this.recipies.recipesChanged.subscribe(() => { this.recipies.getSort().subscribe(a => this.arr = a) })
    });

  }

  getAllRecipies() {
    this.recipies.getAll().subscribe(
      (r) => {
        this.arr = [...r];  // עדכון המערך עם המתכונים שהתקבלו
        // אחרי קבלת המתכונים, מבוצע סינון
        this.filterRecipes();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // פונקציה לסינון המתכונים לפי הקריטריונים
  filterRecipes() {
    this.arr = this.arr.filter(
      (r) =>
        (this.vals.name === '' || r.name.toLowerCase().includes(this.vals.name.toLowerCase())) &&
        (this.vals.dif === 0 || r.difficultLevel <= this.vals.dif) &&
        (this.vals.time === 0 || r.time <= this.vals.time)
    );
  }

  showMore(id: string) {
    this.router.navigate(['/recipe', id]);
  }

  private temp: User = { myBook: [], password: '', username: '' }

  toggleFavorite(id: string) {
    this.us.addToBook(id)
    this.colorMap[id] = this.colorMap[id] === 'black' ? 'red' : 'black'
  }

  loadFavoriteColors() {
    // קריאה למשתמשים כדי לבדוק אילו מתכונים הם במועדפים של המשתמש הנוכחי
    this.us.getAll().subscribe(users => {
      const currentUser = users.find(u => u._id === this.us.getCur());
      if (currentUser) {
        this.arr.forEach(recipe => {
          this.colorMap[recipe._id!] = currentUser.myBook.includes(recipe._id!) ? 'red' : 'black';
        });
      } else {
        // אם לא נמצא משתמש, כל המתכונים יהיו בצבע שחור
        this.arr.forEach(recipe => {
          this.colorMap[recipe._id!] = 'black';
        });
      }
    });

  }
}
