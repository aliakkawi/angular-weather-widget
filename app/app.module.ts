import {NgModule} from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from '@angular/http';


import { AppComponent }from './app.components';
import { WeatherWidgetComponent } from './weather-widget/component/weather.component';
import { SpeedUnitPipe  } from './weather-widget/pipes/speed.unit.pipes';
import { TempUnitPipe } from './weather-widget/pipes/temp.units.pipes';




@NgModule({
    imports: [BrowserModule, JsonpModule, HttpModule ],
    declarations: [ AppComponent, WeatherWidgetComponent , SpeedUnitPipe, TempUnitPipe ],
    bootstrap: [AppComponent]
})

export class AppModule {}