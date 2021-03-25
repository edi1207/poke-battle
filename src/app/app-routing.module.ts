import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BattleComponent } from './components/battle/battle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokeHome',
    pathMatch: 'full' 
  },
  {
    component: HomeComponent,
    path: 'pokeHome',
  },
  {
    component: BattleComponent,
    path: 'pokeBattle',
  },
  // {
    // component
    // path: 'pokeList'
  // },
  {
    path: '**',
    redirectTo: 'pokeHome',
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
