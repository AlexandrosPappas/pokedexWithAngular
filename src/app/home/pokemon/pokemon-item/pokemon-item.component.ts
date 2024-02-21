import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface PokemonData {
  id: number;
  name: string;
  img: string;
  weight: string;
  type: string;
  stats: {
    name: string;
    baseStat: string;
  }[];
  cry: string;
}

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit, OnDestroy {
  pokemonName: string;
  pokemonD: PokemonData | null = null;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name !== null) {
        this.pokemonName = name;
      } else {
        console.log(`something went wrong!`);
      }
    });
    this.fetchPokemon();
  }

  fetchPokemon() {
    this.sub = this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
      .subscribe((pokemon: any) => {
        const pokemonData: PokemonData = {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.sprites.front_default || '/assets/questionmark.png',
          weight: (pokemon.weight * 0.1).toFixed(2),
          type: pokemon.types.map((type: any) => type.type.name).join(', '),
          stats: pokemon.stats.map((statItem: any) => ({
            name: statItem.stat.name,
            baseStat: statItem.base_stat,
          })),
          cry: pokemon.cries.latest,
        };
        this.pokemonD = pokemonData;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
