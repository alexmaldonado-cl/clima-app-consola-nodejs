const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            },

        ]
    }
];



const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción   '.white)
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(menuOptions);
     
    return option;
}

const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Debe ingresar un valor';
                }
                return true;
            }
        }
    ];

    const {description} = await inquirer.prompt(question);
    return description;
}


const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, index) => {
        const indice = `${index + 1}.`.green;
        return {
            value: tarea.id,
            name: `${indice} ${tarea.description}`
       } 
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
     
    return id;
    
} 


const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}




const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, index) => {
        const indice = `${index + 1}.`.green;
        return {
            value: tarea.id,
            name: `${indice} ${tarea.description}`,
            checked: (tarea.finished_at) ? true : false
       } 
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
     
    return ids;
    
} 



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}