"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
const id_list = new Map();

let text = readline.question('Enter the text - '),
    number_list = '';

for (let i = 1; i != text.length + 1; i++) {
    number_list += String(i)
};

for (let i = 0; i != text.length; i++) {
    let new_number = readline.question('Select a new number for the symbol - ' + text[i] + ' from the remaining numbers - ' + number_list + ' = ');
    id_list.set(new_number, text[i]);
    number_list = number_list.replace(new_number, "");
};

console.log(id_list);
let encrypted_text = '';
for (let i = 1; i != text.length + 1; i++) {
    encrypted_text = encrypted_text + id_list.get(String(i));
};

console.log('Encrypted text - ' + encrypted_text);