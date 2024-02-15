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
  stats: string[];
  baseStat: string[];
}

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit, OnDestroy {
  pokemonName: string;
  pokemonD: PokemonData;
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
    console.log(this.pokemonD);
  }

  fetchPokemon() {
    this.sub = this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
      .subscribe((pokemon: any) => {
        const pokemonData: PokemonData = {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.sprites.front_default, // kapoies den exoyn image
          weight: (pokemon.weight * 0.1).toFixed(2),
          type: pokemon.types.map((type: any) => type.type.name).join(', '),
          stats: pokemon.stats.map((stat: any) => stat.stat.name),
          baseStat: pokemon.stats.map((stat: any) => stat.base_stat),
        };
        this.pokemonD = pokemonData;
        console.log(this.pokemonD.stats);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
