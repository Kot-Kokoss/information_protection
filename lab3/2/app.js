"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const id_list = new Map();

let text = readline.question('Enter the text - '),

let mask = ''