import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemons: any = [];
  private sub: Subscription;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.sub = this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .pipe(
        map((responseData: any) => {
          const responseResults = responseData.results;
          return responseResults;
        })
      )
      .subscribe((results) => {
        results.forEach((resultItem: any) => {
          this.http.get(resultItem.url).subscribe((pokemon: any) => {
            const pokemonObj: object = {
              id: pokemon.id,
              name: pokemon.name,
              img: pokemon.sprites.front_default || '/assets/questionmark.png',
              weight: (pokemon.weight * 0.1).toFixed(2),
              imageLoaded: false,
            };
            this.pokemons.push(pokemonObj);
          });
        });
        this.loaderService.hide();
      });
  }

  onPokemonSelect(pokemonName: string) {
    this.router.navigate(['/Pokemon/', pokemonName]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
