import { HttpClient } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { count, map } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemons: any = [];
  constructor(private http: HttpClient, private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.show();
    this.fetchPokemonNumber();
    //console.log(this.pokemons);
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
        for (let i = 1; i <= count; i++) {
          this.http
            .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .subscribe((pokemon: any) => {
              const pokemonObj: object = {
                id: pokemon.id,
                name: pokemon.name,
                img: pokemon.sprites.front_default,
                weight: pokemon.weight * 0.1,
                type: pokemon.types,
              };
              this.pokemons.push(pokemonObj);
            });
        }
        setTimeout(() => {
          this.loaderService.hide();
        }, 700);
        //this.loaderService.hide();
      });
  }
}
