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
var TempUnitPipe = (function () {
    function TempUnitPipe() {
    }
    TempUnitPipe.prototype.transform = function (temp, unitType) {
        switch (unitType) {
            case "celcius":
                var celsius = (temp - 32) * 0.5556;
                return celsius;
            default:
                return temp;
        }
    };
    TempUnitPipe = __decorate([
        core_1.Pipe({
            name: 'tempUnit'
        }), 
        __metadata('design:paramtypes', [])
    ], TempUnitPipe);
    return TempUnitPipe;
}());
exports.TempUnitPipe = TempUnitPipe;
//# sourceMappingURL=temp.units.pipes.js.map