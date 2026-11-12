export class SmartDeviceAPI {

    public static async getData(){

        const response = await fetch('https://arionferraz.github.io/smartDeviceAPI/smartDeviceData.json');
        console.log(response);
        const deviceData = response.json();

        return deviceData;
    }
}