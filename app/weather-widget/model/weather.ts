export class Weather {

    public temp: number;
    public summary: string;
    public wind:number;
    public humidity:number;
    public icon:string;

    constructor(temp: number, summary:string, wind:number, humidity:number, icon:string) {


        this.temp = temp;
        this.summary = summary;
        this.wind = wind;
        this.humidity = humidity;
        this.icon = icon;
    }


}