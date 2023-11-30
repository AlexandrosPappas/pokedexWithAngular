import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { count, map } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemons: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchPokemonNumber();
    console.log(this.pokemons);
  }
  fetchPokemonNumber() {
    this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .pipe(
        map((responseData: any) => {
          const responseCount = responseData.count;
          return responseCount;
        })
      )
      .subscribe((count) => {
        for (let i = 0; i <= count; i++) {
          this.http
            .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .subscribe((pokemon: any) => {
              const pokemonObj: object = {
                pokemonId: pokemon.id,
                pokemonName: pokemon.name,
                pokmeonImg: pokemon.sprites.back_default,
                poemonWeight: pokemon.weight,
                pokemonType: pokemon.types,
              };
              //this.pokemons.push(pokemonObj);
              //console.log(pokemonObj);
            });
        }
      });
  }
}
