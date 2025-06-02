import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/users.service';
import { Recipe } from '../../classes/Recipe';
import { RecipesService } from '../../services/recipes.service';
import { CategoryService } from '../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  r: Recipe = {
    name: '',
    difficultLevel: 0,
    img: '',
    ingrediets: [],
    time: 0,
    categories: [],
    uploadedBy: '',
    discription: ''
  };

  categories: any[] = []

  ngOnInit() {
    this.cs.getAll().subscribe(a => { this.categories = [...a] })
  }

  submit() {
    if (this.us.getCur() != '') {
      this.r.uploadedBy = this.us.getCur()
      console.log(this.r);
      this.rs.addRecipe(this.r)
    } else {
      alert('please log in');
    }
  }

  addIngredient() {
    this.r.ingrediets.push('')
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.r.img = file.name; // שומר רק את שם הקובץ והסיומת
    }
  }

  t: number = 0
  addTimer() {
    this.r.discription += `\{TIME:${this.t}\}`
    this.showTimerInput = false
  }

  selectText(e: any) {
    e.target.select();
  }

  showTimerInput: boolean = false;
  // פונקציה להפעלת / הסתרת תיבת הטיימר
  @ViewChild('timerBtn') timerBtn!: ElementRef;
  popupTop = 0;
  popupLeft = 0;

  toggleTimerInput() {    
    this.showTimerInput = !this.showTimerInput;

    if (this.showTimerInput && this.timerBtn) {
      const rect = this.timerBtn.nativeElement.getBoundingClientRect();
      this.popupTop = rect.top + window.scrollY + 25; // מרחק מתחת לכפתור
      this.popupLeft = rect.left + window.scrollX;    // בדיוק ליד הכפתור
    }
  }

  constructor(private rs: RecipesService, private us: UsersService, private cs: CategoryService) { }
}
