import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'pokedexWithAngular';
  @ViewChild('header', { static: false }) header!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    this.setHeaderBackground();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.setHeaderBackground();
  }

  setHeaderBackground() {
    const scrollPosition =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    const headerElement = this.header.nativeElement;

    if (scrollPosition > 0) {
      headerElement.style.backgroundColor = '#fff';
    } else {
      headerElement.style.backgroundColor = 'transparent';
    }
  }
}
