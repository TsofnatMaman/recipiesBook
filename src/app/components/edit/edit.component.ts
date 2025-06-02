import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../../classes/Recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoryService } from '../../services/category.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private route: ActivatedRoute, private rs: RecipesService, private cs: CategoryService, private us: UsersService) { }
  r: Recipe = { categories: [], difficultLevel: 0, img: '', ingrediets: [], name: '', time: 0, uploadedBy: '', discription: '' }
  categories: any[] = []

  ngOnInit() {
    this.route.params.subscribe(p => { this.rs.getAll().subscribe(a => { this.r = a.find(rs => rs._id == p['id'])! }) })
    this.cs.getAll().subscribe(c => { this.categories = [...c] })
  }

  save() {
    if (this.us.getCur() != '') {
      console.log(this.r);
      this.rs.put(this.r).subscribe(res => console.log(res));
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

  canEdit() {
    return this.r.uploadedBy == this.us.getCur()
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
}
