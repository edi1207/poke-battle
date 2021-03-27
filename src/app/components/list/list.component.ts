import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FetchService } from './../../services/fetch.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy, OnInit {
  public names: string[] = [];
  public page =  1;
  public pageSize = 12;

  private pokemonListSubscription: Subscription;
  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.page = (localStorage.getItem('page')) ? parseInt(localStorage.getItem('page'), 10) : 1;
    this.getPokemons(0);
  }

  getPokemons(p: number): void {
    this.resetNames();

    // it's 1118 of them divided by 12 per page and thats 93.16 so we need 94 pages
    if (this.page + p > 0 && this.page + p < 95) {
      this.page += p;
    }


    this.pokemonListSubscription = this.fetchService.getPokemonList(this.page - 1).subscribe(
      (data: any) => {
        this.resetNames();
        data.results.forEach(res => {
          this.names.push(res.name);
        });
      }
    );
  }

  savePage(): void {
    localStorage.setItem('page', this.page.toString());
  }

  resetNames(): void {
    this.names = [];
  }

  ngOnDestroy(): void {
    if (this.pokemonListSubscription) {
      this.pokemonListSubscription.unsubscribe();
    }
  }
}
