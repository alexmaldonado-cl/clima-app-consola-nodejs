const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let optionMenu;

    do {
        optionMenu = await inquirerMenu();

        switch (optionMenu) {
            case 1:
                //1 -Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                //2 -Buscar los lugares
                //3 - Seleccionar el lugar
                //4 - Clima
                //5 - Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Latitud:',);
                console.log('Longitud:',);
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