import { HttpClient } from '@angular/common/http';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, count, map } from 'rxjs';
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
    this.fetchPokemonNumber();
  }

  fetchPokemonNumber() {
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
              img: pokemon.sprites.front_default, // kapoies den exoyn image
              weight: (pokemon.weight * 0.1).toFixed(2),
              type: pokemon.types,
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
