import { Component, OnInit } from '@angular/core';
import { FigureService } from '../figure.service';

@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.css']
})
export class FiguresComponent implements OnInit {
  random_position: number[] = [];
  figure_block: HTMLElement | undefined;

  constructor(private figureService: FigureService,){
    this.random_position = this.figureService.getRandomPosition();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setFigure(this.random_position);
    }, 100)

  }
  
  setFigure(position: number[], figure: string = "horse"){
    const blocks_coll = document.querySelectorAll('.block-1,.block-2') as unknown as HTMLCollectionOf<HTMLElement>;
    
    const blocks = Array.from(blocks_coll);

    if (blocks != null){
        console.log(position)
        this.figure_block = blocks.find(b=>b.dataset['position'] == position.toString());
        this.figure_block?.classList.add('figure')
        this.figure_block?.appendChild(this.figureService.createFigureElement(figure));
      }
    }

}

