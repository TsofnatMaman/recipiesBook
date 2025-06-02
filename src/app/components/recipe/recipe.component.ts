import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../classes/Recipe';
import { RecipesService } from '../../services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { CategoryService } from '../../services/category.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-recipe',
  imports: [MatIconModule, CommonModule, TimerComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  dis: string[] = []
  id: string = '';
  r: Recipe = {
    _id: '',
    name: '',
    img: '',
    ingrediets: [],
    difficultLevel: 0,
    time: 0,
    categories: [],
    uploadedBy: '',
    discription: ''
  };

  color: string = 'black'

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private us: UsersService,
    private cs: CategoryService,
    private router: Router
  ) { }

  by: string = ''

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    // this.recipesService.getById(this.id).subscribe(rs=>{
    //   this.r=rs
    //   console.log(rs);

    // })
    this.recipesService.getAll().subscribe(a => {
      this.r = a.find(rs => rs._id == this.id)!
      this.dis = this.spiltTimer(this.r.discription)
    })


    this.us.getAll().subscribe(a => {
      const f = a.find(u => u._id == this.us.getCur())?.myBook.find(rs => rs == this.r._id)
      if (f == undefined) {
        this.color = 'black'
      }
      else {
        this.color = 'red'
      }

    })
    console.log('r', this.r);

    this.getCategory()
    this.us.getAll().subscribe(a => { this.by = a.find(u => u._id == this.r.uploadedBy)!.username })
  }

  toggleFavorite(id: string) {
    this.us.addToBook(id).subscribe(() => {
      this.us.getAll().subscribe(a => {
        this.color = this.color == 'red' ? 'black' : 'red'
      })
    })
  }

  categs: any[] = [{ name: '', icon: '' }];
  getCategory() {    
    this.cs.getAll().subscribe(a => {
      this.categs = a.filter((c: { _id: string; }) => this.r.categories.find(ct => c._id == ct))
      console.log(this.categs);
      
    })
  }

  edit() {
    this.router.navigate(['edit', this.r._id])
  }

  spiltTimer(value: string) {
    if (!value) return [];

    // פיצול המחרוזת למקטעים: טקסט רגיל ומספרים שבתוך {TIME:number}
    const parts: string[] = [];
    const regex = /{TIME:(\d+)}/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(value)) !== null) {
      // הוספת הטקסט שלפני התגית
      if (match.index > lastIndex) {
        parts.push(value.substring(lastIndex, match.index));
      }
      // הוספת ה-<app-timer> עם הזמן המתאים
      parts.push(match[1]);
      lastIndex = regex.lastIndex;
    }

    // הוספת שאר הטקסט לאחר כל התגיות
    if (lastIndex < value.length) {
      parts.push(value.substring(lastIndex));
    }

    // מחזיר את כל החלקים מחוברים ל-HTML אחד
    console.log(parts);

    return parts;
  }

  isDigit(val: string) {
    return !isNaN(Number(val));
  }
}
