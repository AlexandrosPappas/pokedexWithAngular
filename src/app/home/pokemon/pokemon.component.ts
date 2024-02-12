import { HttpClient } from '@angular/common/http';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { count, map } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemons: any = [];

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.fetchPokemonNumber();
    this.loaderService.hide();
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
                weight: (pokemon.weight * 0.1).toFixed(2),
                type: pokemon.types,
              };
              this.pokemons.push(pokemonObj);
            });
        }
        // setTimeout(() => {
        //   this.loaderService.hide();
        // }, 700);
      });
  }

  onPokemonSelect(pokemonName: string) {
    this.router.navigate(['/Pokemon/', pokemonName]);
  }
}
