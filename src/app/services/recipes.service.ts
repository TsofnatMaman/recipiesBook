import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../classes/Recipe';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged = new EventEmitter<Recipe[]>();
  private url: string = 'http://localhost:3001/recipies/';

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  addRecipe(n: Recipe) {
    this.http.post<Recipe>(this.url, n)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['all'])
      })
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.url + id)
  }



  sort: { name: string, dif: Number, time: Number, categs: { [key: string]: boolean } } = { name: '', dif: 0, time: 0, categs: {} }

  setSort(name: string, dif: Number, time: Number, categs: {}) {
    this.sort.name = name
    this.sort.dif = dif
    this.sort.time = time
    this.sort.categs = categs
    this.recipesChanged.emit(); // שליחת האירוע
  }

  getSort(): Observable<Recipe[]> {
    console.log(this.sort);

    return this.getAll().pipe(
      map(recipes => recipes.filter(
        (r) =>
          (this.sort.name === '' || r.name.toLowerCase().includes(this.sort.name.toLowerCase())) &&
          (this.sort.dif === 0 || r.difficultLevel <= this.sort.dif) &&
          (this.sort.time === 0 || r.time <= this.sort.time) &&
          (Object.keys(this.sort.categs).length == 0 || r.categories.some(b => this.sort.categs[b] == true))
        ))
    );
  }

  put(r: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.url + r._id, r)
  }

  /*
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'pizza',
      difficultLevel: 2,
      time: 2,
      ingredients: ['flour', 'yeast', 'water', 'salt', 'sugar', 'oil'],
      image: '/assets/pizza.png',
    },
    {
      id: 2,
      name: 'salad',
      difficultLevel: 1,
      time: 0.5,
      ingredients: ['cuccamber', 'onion', 'olive', 'tommato', 'salt', 'oil'],
      image: '/assets/salad.jpg',
    },
    {
      id: 3,
      name: 'pasta',
      difficultLevel: 3,
      time: 10,
      ingredients: ['pasta', 'onion', 'milk', 'salt', 'cream'],
      image: '/assets/pasta.jpg',
    },
  ];
  private id: number = 4;

  getRecipes() {
    return this.recipes;
  }

  addRecipe(r: Recipe) {
    r.id = this.id;
    this.id++;
    this.recipes.push(r);
    this.router.navigate(['all']);
  }
  */
}
