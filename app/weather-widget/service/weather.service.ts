import { Injectable } from '@angular/core';

import { WEATHER_KEY, URL_ROOT, GOOGLE_API_KEY, GOOGLE_ROOT } from '../constants/constants';

import { Jsonp, Http } from '@angular/http';
import {enableProdMode} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable() // means that we can pass it as a parameter for the component.

// the service is responsible for holding and arranging the data and then passing to the Components.

export class WeatherService {


    constructor (private jsonp: Jsonp, private http: Http) { }


    // get the current location for the user so we can pass them to the weather api.

    getCurrentLocation(): Observable<any> { // we will make it an observable so that 
        // the getCurrentWeather method will run only if data has been successfully retrieved.

        /* most of the modern browser has an api that provides the current location, for safty we are gonna check first if the
          api do exist in the user browser.     */


        if (navigator.geolocation) { // check if the browser can provide location.

            return Observable.create(observer => {

                   navigator.geolocation.getCurrentPosition(pos => {

                   observer.next(pos);
               
               });

               err => {

                   return Observable.throw(err);
               }
            });
            

        } else {
            //console.error("Your browser cannot provide location");
            return Observable.throw("Your browser cannot provide location");
        }

    }

    getCurrentWeather (lat: number, lon: number): Observable<any> {

        const url = URL_ROOT + WEATHER_KEY + "/" + lat + "," + lon;
        const queryParameters = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParameters)
        .map(data => data.json())

        .catch(err => {

            console.error("Unable to get weather data - ", err);
            return Observable.throw(err.json());
        });
    }



// Important: we need to add http request in app module.
    getCurrentAddress (lat: number, long: number): Observable<any> {

        let url = GOOGLE_ROOT + lat + "," + long + "&key=" + GOOGLE_API_KEY;

        return this.http.get(url)
        .map(data => data.json())

        .catch(err => {

            console.error("Unable to get address data - ", err);
            return Observable.throw(err.json());
        });


    }


}