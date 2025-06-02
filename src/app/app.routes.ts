import { Routes } from '@angular/router';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { MyBookComponent } from './components/my-book/my-book.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
  { path: '', component: AllRecipesComponent },
  { path: 'all', component: AllRecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myBook', component: MyBookComponent },
  { path: 'edit/:id', component: EditComponent }
];
