import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number) {
    return this.http.get(
      this.baseUrl + `pokemon?limit=12&offset=${offset * 12}`
      );
  }

  getPokemon(pokeName?: string, id?: number) {
    if (pokeName) {
      return this.http.get(
        this.baseUrl + `pokemon/${pokeName}`
        );
    } else if (id) {
      return this.http.get(
        this.baseUrl + `pokemon/${id}`
        );
    }
  }
}
