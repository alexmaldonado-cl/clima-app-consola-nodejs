const axios = require('axios');

class Busquedas {


    constructor() {
        //TODO: leer BD si existe
    }

    async ciudad(lugar = '') {
        //petición http
        console.log(lugar);

        const response = await axios.get('https://reqres.in/api/users?page=2');
        console.log(response.data);

        return [];
    }

}

module.exports = Busquedas;