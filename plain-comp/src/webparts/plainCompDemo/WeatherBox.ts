import styles from './PlainCompDemoWebPart.module.scss';

// WeatherBox Class Component
export class WeatherBox {
    constructor(public city: string, public temp: number, public humidity: number) {
    }

    public render() : string {
        return `
            <div>
                <span class="${ styles.label }">${ this.city }</span><br/>
                <span class="${ styles.label }">${ this.temp }</span><br/>
                <span class="${ styles.label }">${ this.humidity }</span><br/>
                <input type="button" onclick="increase();" value=" Increment " />
            </div>
        `;
    }

    public increase = (event) => {
        console.log("Increase event fired!");
        this.temp++;
        alert("Increase Button Clicked!");
    }
}