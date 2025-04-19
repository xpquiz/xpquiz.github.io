import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'score'})
export class ScorePipe implements PipeTransform {

  public transform(value: string): any {
    const pointerCharacter: string = ' - ';
    const splittedString: string[] = value.split(':');
    const desiredLength: number = 20 - splittedString[0].length - splittedString[1].length;

    return `${splittedString[0]}${pointerCharacter.repeat(desiredLength)}${splittedString[1]}`
  }

}
