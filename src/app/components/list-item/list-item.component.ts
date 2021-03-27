import { Subscription } from 'rxjs';
import { FetchService } from './../../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnDestroy, OnInit {
  public pokeName: string;
  // public id: number;
  public pokeInfos: {
    abilityNames: string[],
    stats: {
      base_stat: string;
      effort: string;
      stat: {
        name: string;
        url: string;
      }
    }[]
  };

  private pokemonSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fetchService: FetchService) {
      this.pokeInfos = {
        abilityNames : [],
        stats : [],
      };
    }

  ngOnInit(): void {
    this.pokeName = this.route.snapshot.params.name;

    this.pokemonSubscription = this.fetchService.getPokemon(this.pokeName).subscribe(
      (data: any) => {
        data.abilities.forEach(a => {
          this.pokeInfos.abilityNames.push(a.ability.name);
        });
        this.pokeInfos.stats = data.stats;
      }

    );
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }
}
