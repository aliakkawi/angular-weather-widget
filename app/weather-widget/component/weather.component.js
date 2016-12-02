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
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constants_1 = require('../constants/constants');
var WeatherWidgetComponent = (function () {
    // we have to declare it aboce to get rid of the error.
    function WeatherWidgetComponent(service) {
        /* Important: the WeatherService is a dependency for the component, it rely on it to get the data.
            so we are Injecting it in the Component each time we make an instance of that Component by adding it as a parameter
            in the constructor.  This is called Dependancy Injection.

            The reason we are doing passing it as a parameter and not using,   this.service = new WeatherService(); because any changes in
            the WeatherService class by adding new parameters to it will not affect the component class.

        */
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.addressString = "";
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = "celcius";
        this.dataDidReceived = false;
        // adding the animated icon we added a js file to index.html:
        this.icons = new Skycons(); // the class is not recognized by ts because it is in a js format.
        // both functions below work asynchronously, therefore we cannot directly pass the location data from the first
        // to the second because the data will not yet be available when calling the second.
    }
    WeatherWidgetComponent.prototype.ngOnInit = function () {
        this.getCurrentLocationWC();
    };
    WeatherWidgetComponent.prototype.getCurrentLocationWC = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            console.log("coords" + _this.pos.coords.latitude + "," + _this.pos.coords.longitude);
            _this.getCurrntWeatherWC();
            _this.getCurrentAddressWC();
        }, function (err) { return console.error(err); });
    };
    WeatherWidgetComponent.prototype.getCurrntWeatherWC = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            console.log(weather);
            _this.weatherData.temp = weather["currently"]["temperature"];
            _this.weatherData.summary = weather["currently"]["summary"];
            _this.weatherData.humidity = weather["currently"]["humidity"];
            _this.weatherData.wind = weather["currently"]["windSpeed"];
            _this.weatherData.icon = weather["currently"]["icon"];
            // call the setIcon method.
            _this.setIcon();
            _this.dataDidReceived = true;
            console.log("WeatherData: " + _this.weatherData.temp);
        }, function (err) { return console.error(err); });
    };
    WeatherWidgetComponent.prototype.getCurrentAddressWC = function () {
        var _this = this;
        var latNum = this.pos.coords.latitude.toFixed(2);
        var lonNum = this.pos.coords.longitude.toFixed(1);
        this.service.getCurrentAddress(parseFloat(latNum), parseFloat(lonNum)) // hardcoded the location because no data for my location.
            .subscribe(function (address) {
            _this.addressString = address["results"][1]["formatted_address"];
            console.log("Addess json: " + _this.addressString); // 1 because it is the second item in the array.
        }, function (err) { return console.error(err); });
    };
    WeatherWidgetComponent.prototype.changeCurrentTempUnit = function () {
        if (this.currentTempUnit == "celcius") {
            this.currentTempUnit = "fehrenhite";
        }
        else {
            this.currentTempUnit = "celcius";
        }
    };
    WeatherWidgetComponent.prototype.changeWindSpeedUnit = function () {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    // method to set the icon.
    WeatherWidgetComponent.prototype.setIcon = function () {
        this.icons.add("iconId", this.weatherData.icon); // iconId is the id for the canvas.
        this.icons.play();
    };
    WeatherWidgetComponent.prototype.setStyles = function () {
        var weatherIconName = this.weatherData.icon;
        if (weatherIconName) {
            this.icons.color = constants_1.WEATHER_COLORS[weatherIconName]["color"];
            return constants_1.WEATHER_COLORS[weatherIconName]; // return the style from the constants file according to the icon name.
        }
        else {
            this.icons.color = constants_1.WEATHER_COLORS["default"]["color"];
            return constants_1.WEATHER_COLORS["default"];
        }
    };
    WeatherWidgetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherWidgetComponent);
    return WeatherWidgetComponent;
}());
exports.WeatherWidgetComponent = WeatherWidgetComponent;
//# sourceMappingURL=weather.component.js.map