#!/usr/bin/env node

const inquirer = require('inquirer');
const { ProcessCycler } = require('./cycler');

//const path = require('path');

inquirer.prompt([ 
    {
        type: 'input',
        name: 'scriptPath',
        message: 'Insert script path:'
    },
    {
        type: 'number',
        name: 'cycles',
        message: 'Insert number of cycles:'
    }
]).then( (answers) => {
    const config = {
        scriptPath: answers.scriptPath,
        cycles: answers.cycles
    }
    new ProcessCycler(config).startExecution();
});


