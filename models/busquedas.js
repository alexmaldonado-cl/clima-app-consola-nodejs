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
 
    async ciudad(lugar = '') {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
                
                // ? proximity = ip & types=place % 2Cpostcode % 2Caddress % 2Cregion & language=es & access_token=`
            });
        

            const response = await instance.get();

            console.log(response.data);

            return [];
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = Busquedas;