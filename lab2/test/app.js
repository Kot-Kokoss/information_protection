"use strict";
const readlineSync = require('readline-sync');

let name = readlineSync.question('Введите ваше имя: ');
console.log('Привет,' + name + '!');