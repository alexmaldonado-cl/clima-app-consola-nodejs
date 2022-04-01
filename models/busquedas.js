const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map(h => h.toLocaleUpperCase());
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
            const data     = response.data;

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



    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial.unshift(lugar);

        this.guardarDB();
    }


    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }
    
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
    
        return data;
    }

}

module.exports = Busquedas;