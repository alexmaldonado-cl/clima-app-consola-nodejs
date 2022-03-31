require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.env);

const main = async () => {

    const busquedas = new Busquedas();
    let optionMenu;

    do {
        optionMenu = await inquirerMenu();

        switch (optionMenu) {
            case 1:
                //1 -Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);

                const id = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

                //2 -Buscar los lugares
                //3 - Seleccionar el lugar
                //4 - Clima
                //5 - Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:',lugarSeleccionado.nombre);
                console.log('Latitud:',lugarSeleccionado.lat);
                console.log('Longitud:',lugarSeleccionado.lng);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Máxima:',);
                break;
            case 2:
            
                break;
        }

        if (optionMenu !== 0) await pausa();

    } while (optionMenu !== 0);
}


main();