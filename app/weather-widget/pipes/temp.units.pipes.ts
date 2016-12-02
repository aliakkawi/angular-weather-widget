import {Pipe, PipeTransform} from '@angular/core'

@Pipe ({

    name: 'tempUnit'
})

export class TempUnitPipe implements PipeTransform { // we need to import this in the app module.


    transform(temp: number, unitType: string) {

        switch(unitType) {


            case "celcius":
            const celsius = (temp -32) * 0.5556;
            return celsius ;
            
            default:

            return temp;
        }

    }
}