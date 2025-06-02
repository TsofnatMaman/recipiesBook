import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  name: string = '';
  dif: number = 0;
  time: number = 0;

  categories: any[] = []
  selectedCategories: { [key: string]: boolean } = {}

  constructor(private s: RecipesService, private cs: CategoryService, private router: Router) { }

  ngOnInit() {
    this.cs.getAll().subscribe(a => {
      this.categories = [...a]
    })
  }

  save() {
    this.s.setSort(this.name, this.dif, this.time, this.selectedCategories)
    const r = this.router.url.split('/')[1] == 'all' || this.router.url.split('/')[1] == 'myBook' ? this.router.url.split('/')[1] : 'all'
    this.router.navigate([r]);
    // this.refresh()
  }

  refresh() {
    this.name = ''
    this.dif = 0
    this.time = 0
    this.selectedCategories = {}
    this.s.setSort('', 0, 0, {})
  }
}
