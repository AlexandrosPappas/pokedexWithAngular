import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PokemonItemComponent } from './home/pokemon/pokemon-item/pokemon-item.component';
import { PokemonComponent } from './home/pokemon/pokemon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Pokemon',
    component: PokemonComponent,
    children: [],
  },
  {
    path: 'Pokemon/:name',
    component: PokemonItemComponent,
  },
  { path: 'About', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
