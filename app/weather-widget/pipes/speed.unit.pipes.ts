import {Pipe, PipeTransform} from '@angular/core'

@Pipe ({

    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform { // we need to import this in the app module.


    transform(speed: number, unitType: string) {

        switch(unitType) {


            case "mph":
            const miles = (speed *1.6).toFixed();
            return miles + " mph";
            
            default:
            var fixedSpeed = Number(speed).toFixed()
            return fixedSpeed + " kph";
        }

    }
}