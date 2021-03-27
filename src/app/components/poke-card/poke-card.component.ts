import { Subscription } from 'rxjs';
import { FetchService } from './../../services/fetch.service';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent implements OnDestroy, OnChanges, OnInit {
  @Input() pokeName: string;
  @Input() showShadow = true;

  // public pokeName: string;
  public pokeImgUrl: string;

  private pokemonSubscription: Subscription;
  constructor(private fetchService: FetchService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    this.pokemonSubscription = this.fetchService.getPokemon(this.pokeName)?.subscribe(
      (data: any) => {
        this.pokeName = data.name;
        this.pokeImgUrl = data.sprites.front_default;
        this.sanitizer.bypassSecurityTrustUrl(this.pokeImgUrl);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }

}
