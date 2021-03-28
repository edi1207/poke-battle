import { Subscription } from 'rxjs';
import { FetchService } from './../../services/fetch.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  animations: [
    trigger('state', [
      state('up', style({
        transform: 'translateY(0%)'
      })),
      state('down', style({
        transform: 'translateY(-100%)'
      })),
      transition('* => *', animate('600ms ease')),
    ])
  ]
})
export class BattleComponent implements OnDestroy, OnInit {
  public pokemon1 = new PokemonModel();
  public pokemon2 = new PokemonModel();
  public winnerName = '';
  public isDraw = false;
  public position = 'up';

  private pokemonSubscription: Subscription;
  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.startBattle();
  }

  startBattle(): void {
    this.position = 'up';

    this.winnerName = '';
    this.getPokemon(this.random(1, 898), 1);
    this.getPokemon(this.random(1, 898), 2);
    setTimeout(
      () => {
        this.calculateWinner();
        this.position = 'down';
      }, 5000
    );
  }

  getPokemon(id: number, n: number): void {
    this.pokemonSubscription = this.fetchService.getPokemon(null, id)?.subscribe(
      (data: any) => {
        if (n === 1) {
          this.pokemon1.name = data.name;
          data.stats.forEach(s => {
            this.pokemon1.stats.push(s.base_stat);
          });
        } else if (n === 2) {
          this.pokemon2.name = data.name;
          data.stats.forEach(s => {
            this.pokemon2.stats.push(s.base_stat);
          });
        }
      }
    );
  }

  calculateWinner(): void {
    this.isDraw = false;
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      sum = sum + (this.pokemon2.stats[i] - this.pokemon1.stats[i]);
    }
    if (sum === 0) {
      this.isDraw = true;
    } else {
      this.winnerName = (sum > 0) ? this.pokemon2.name : this.pokemon1.name;
      localStorage.setItem('winner', this.winnerName);
    }

  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  removeWinner(): void {
    localStorage.removeItem('winner');
  }

  ngOnDestroy(): void {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }
}

export class PokemonModel {
  name: string;
  stats: number[] = [];
}
