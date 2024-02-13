import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit {
  pokemonName: string;

  constructor(private route: ActivatedRoute) {
    this.pokemonName = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name !== null) {
        this.pokemonName = name;
        console.log(name);
      } else {
      }
    });
  }
}
