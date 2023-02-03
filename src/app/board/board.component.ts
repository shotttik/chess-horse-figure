import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FigureService } from '../figure.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger ('figureMove',[
      state('move', style({
        transform: 'translateX(-100%) translateY(50px)',
      })),
    ])
  ]
})

export class BoardComponent implements OnInit{
  row_numbers: number[] = [];
  column_numbers: number[] = [];
  selected_el: any | null;
  avialable_moves: any[] = [];
  target_element: any | null;
  
  constructor(
    private figureService: FigureService,
  ) {
    this.row_numbers = this.column_numbers = this.figureService.getNumbersArray();

  }

  ngOnInit(): void {
    
  }
  
  onSelect(event: Event | null) {
    // target elements da selected elements ertidaigive mnishnvelobas ar vadzlevt radgan moveFigureshi gvchirdeba selected_el rata movashorot klasebi
    // da aseve gadmovitanot figuris elementi chvens shemtxvevashi img
    this.target_element = this.getDivFromEvent(event)
    // figuris gadaadgileba gadaadgilebas vushvebt im shemtvxvevashi tu figura ar aris kvadratshi da gadaadgileba shesadzlebelia
    if(this.avialable_moves.length && !this.target_element.classList.contains('figure')) {
      if(!this.target_element.classList.contains('available_move')) return;
      this.moveFigure()
      return
    }
    
    this.selected_el= this.getDivFromEvent(event)
    console.log(this.selected_el)
    // shevamowmot figure aris tuarada davabrunot
    if (!this.selected_el.matches('.figure')) return;

    // shevamowmot tu figura ukve archeulia movashorot select da movashorot kvela shesadzlebeli gadaadgileba
    if (this.selected_el.classList.contains('selected')){
      this.removeSelected()
      this.figureService.removeAvaiableMoves();
      
      return;
    };
    
    this.selected_el.classList.add('selected');

    this.avialable_moves = this.figureService.getHorseavailable_moves(this.selected_el.dataset.position)
    
    if (!this.avialable_moves){
      this.removeSelected()
      return
    };
    this.avialable_moves.forEach((move) => this.figureService.setavailable_moves(move))
  }

  moveFigure(): void{
    this.target_element.appendChild(this.selected_el.firstChild)
      this.figureService.removeAvaiableMoves()
      this.avialable_moves = []
      this.selected_el.classList.remove('selected', 'figure')
      this.target_element.classList.add('figure')

  }

  removeSelected(): void{
    this.selected_el.classList.remove('selected');
  }
  
  getDivFromEvent(event: Event| null){
    return (event?.target as Element).closest('div')
  }

}
