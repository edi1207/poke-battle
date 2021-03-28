import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './components/battle/battle.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokeHome',
    pathMatch: 'full'
  },
  {
    component: HomeComponent,
    path: 'pokeHome',
    data: { animation: 'isLeft' }
  },
  {
    component: BattleComponent,
    path: 'pokeBattle',
    data: { animation: 'isRight' }
  },
  {
    component: ListComponent,
    path: 'pokeList'
  },
  {
    component: ListItemComponent,
    path: 'pokeList/:name',
  },
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
