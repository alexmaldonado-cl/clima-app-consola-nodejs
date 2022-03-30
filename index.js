const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");

const main = async () => {
    let optionMenu;

    do {
        optionMenu = await inquirerMenu();
        console.log({ optionMenu });

        if (optionMenu !== 0) await pausa();

    } while (optionMenu !== 0);
}


main();