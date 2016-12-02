import {Component } from '@angular/core';

@Component({
    selector: 'my-app', // we are not gonna be using a seperate html and css for the AppComponent.
    template: `

        <div class="container">

            <div class="col-xs-4">

                <weather-widget></weather-widget>

            </div>
        </div>

    `,

    styles: [`
    
        .container{

            margin-top: 5rem;
        }
    `]
})
export class AppComponent { }