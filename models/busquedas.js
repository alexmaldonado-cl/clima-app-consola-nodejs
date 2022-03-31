const axios = require('axios');

class Busquedas {


    constructor() {
        //TODO: leer BD si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    paramsOpenweather(lat, lon) {
        return {
            lat,
            lon,
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }
 
    async ciudad(lugar = '') {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
        

            const response = await instance.get();

            return response.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }
    }



    async climaLugar(lat, lon) {
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramsOpenweather(lat, lon)
            });
        
            const response = await instance.get();
            const data = response.data;

            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp
            }
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = Busquedas;