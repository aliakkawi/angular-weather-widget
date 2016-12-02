import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import {enableProdMode} from '@angular/core';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;


@Component({

    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html', 
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]

    // we need to import this component from the app.module.ts

})

export class WeatherWidgetComponent implements OnInit { // function that is related to the life cycle of the component,
    // after the initialization of the component.


    pos: Position; 
    weatherData = new Weather(null, null, null, null, null);
    addressString = "";
    currentSpeedUnit = "kph";
    currentTempUnit = "celcius";
    dataDidReceived = false;

    // adding the animated icon we added a js file to index.html:

    icons = new Skycons();// the class is not recognized by ts because it is in a js format.
    // we have to declare it aboce to get rid of the error.

    

    constructor(private service: WeatherService) {

        /* Important: the WeatherService is a dependency for the component, it rely on it to get the data.
            so we are Injecting it in the Component each time we make an instance of that Component by adding it as a parameter
            in the constructor.  This is called Dependancy Injection.

            The reason we are doing passing it as a parameter and not using,   this.service = new WeatherService(); because any changes in
            the WeatherService class by adding new parameters to it will not affect the component class. 

        */

        

        // both functions below work asynchronously, therefore we cannot directly pass the location data from the first
        // to the second because the data will not yet be available when calling the second.

        

    }

    ngOnInit(){

        this.getCurrentLocationWC()


    }

    getCurrentLocationWC () {

        this.service.getCurrentLocation()
        .subscribe(position =>{
            this.pos = position;

            console.log("coords" + this.pos.coords.latitude + "," + this.pos.coords.longitude);

            

            this.getCurrntWeatherWC();
            this.getCurrentAddressWC();

        },
        err => console.error(err));

    }


    getCurrntWeatherWC () {

        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                
                console.log(weather)

                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.summary = weather["currently"]["summary"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                this.weatherData.icon = weather["currently"]["icon"];

                // call the setIcon method.
                this.setIcon ();

                this.dataDidReceived = true;

                console.log("WeatherData: " + this.weatherData.temp);
            
        },
            err => console.error(err))

    }

    getCurrentAddressWC() {

        var latNum = this.pos.coords.latitude.toFixed(2);
        var lonNum = this.pos.coords.longitude.toFixed(1);
        this.service.getCurrentAddress(parseFloat(latNum), parseFloat(lonNum)) // hardcoded the location because no data for my location.
            .subscribe(address =>{

                this.addressString = address["results"][1]["formatted_address"];
                console.log("Addess json: " + this.addressString); // 1 because it is the second item in the array.


            },
             err => console.error(err))
            
            
    }

    changeCurrentTempUnit() {

        if (this.currentTempUnit == "celcius"){

            this.currentTempUnit = "fehrenhite";

        } else {

            this.currentTempUnit = "celcius";
        }

        
    }

    changeWindSpeedUnit () {


        if (this.currentSpeedUnit == "kph") {

            this.currentSpeedUnit = "mph";
        }else {

            this.currentSpeedUnit = "kph"
        }
    }

    // method to set the icon.

    setIcon () {

        this.icons.add("iconId", this.weatherData.icon); // iconId is the id for the canvas.
        this.icons.play();
    }


    setStyles (): Object {

        var weatherIconName = this.weatherData.icon;

        

        if ( weatherIconName ) { // if it is not null.


            this.icons.color = WEATHER_COLORS[weatherIconName]["color"];
            return WEATHER_COLORS [weatherIconName]; // return the style from the constants file according to the icon name.

        } else {

            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }


}