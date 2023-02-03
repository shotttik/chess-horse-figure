import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FigureService {

  constructor() { }

  getNumbersArray(length: number=8): number[] {
    return Array.from({"length": length}, (_, i) => i+1)
  }

  getRandomNumber(min: number=1, max: number=9): number{
    return Math.floor(Math.random() * (max - min) + 1)
  }

  getRandomPosition (): number[] { 
    let position: number[] = [];
    for (let i = 0; i <2; i++) position.push(this.getRandomNumber())
    return position;
    // return [this.getRandomNumber(), this.getRandomNumber()]
  }

  createFigureElement(figure: string){
    let img = document.createElement('img')
    if (figure == 'horse') img.src="assets/figures/horse.svg"
    return img
  }

  getHorseavailable_moves(position: string){
    const [r,c]  = JSON.parse("[" + position + "]");
    let moves = [];
    
    moves.push([r-2, c+1])
    moves.push([r-2, c-1])
    moves.push([r-1, c+2])
    moves.push([r-1, c-2])
    moves.push([r+1, c+2])
    moves.push([r+1, c-2])
    moves.push([r+2, c+1])
    moves.push([r+2, c-1])

    const result = moves.filter(this.getavailable_moves);
    return result
  }

  getavailable_moves(position: any){
    const [r,c] = position
    return r > 0 && r < 9 && c > 0 && c <9

  }

  setavailable_moves(position: any){
    const blocks_coll = document.querySelectorAll('.block-1,.block-2') as unknown as HTMLCollectionOf<HTMLElement>;
    
    const blocks = Array.from(blocks_coll);

    let figure_block = blocks.find(b=>b.dataset['position'] == position.toString());

    figure_block?.classList.add("available_move")

  }

  removeAvaiableMoves(){
    let elements = document.querySelectorAll('.available_move')
    elements.forEach(element => {
      element.classList.remove("available_move")
    })
  }

  





}
