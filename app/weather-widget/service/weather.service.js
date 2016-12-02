"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var constants_1 = require('../constants/constants');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var WeatherService = (function () {
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    }
    // get the current location for the user so we can pass them to the weather api.
    WeatherService.prototype.getCurrentLocation = function () {
        // the getCurrentWeather method will run only if data has been successfully retrieved.
        /* most of the modern browser has an api that provides the current location, for safty we are gonna check first if the
          api do exist in the user browser.     */
        if (navigator.geolocation) {
            return Observable_1.Observable.create(function (observer) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    observer.next(pos);
                });
                (function (err) {
                    return Observable_1.Observable.throw(err);
                });
            });
        }
        else {
            //console.error("Your browser cannot provide location");
            return Observable_1.Observable.throw("Your browser cannot provide location");
        }
    };
    WeatherService.prototype.getCurrentWeather = function (lat, lon) {
        var url = constants_1.URL_ROOT + constants_1.WEATHER_KEY + "/" + lat + "," + lon;
        var queryParameters = "?callback=JSONP_CALLBACK";
        return this.jsonp.get(url + queryParameters)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get weather data - ", err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    // Important: we need to add http request in app module.
    WeatherService.prototype.getCurrentAddress = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT + lat + "," + long + "&key=" + constants_1.GOOGLE_API_KEY;
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get address data - ", err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map