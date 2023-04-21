"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
let fileContent = fs.readFileSync('text.txt', 'utf-8');

let text = readline.question('Enter the text or press 1 to read the text from the file - ');
const encrypted_step = Number(readline.question("Enter the encryption step - "));

if (text == 1) {
    text = fileContent;
};

console.log('Original message - ', text);

let encrypted_text = '';

for (let i = 0; i != text.length; i++) {
    let char = String(text[i]);
    let buffer = iconv.encode(char, 'cp1251');
    let code = buffer[0];
    let encrypted_code = code + encrypted_step;
    
    if (encrypted_code > 255) {
        encrypted_code -= 256;
    };

    let bytes = new Uint8Array([encrypted_code]);
    let encrypted_element = iconv.decode(Buffer.from(bytes), 'cp1251');
    encrypted_text += encrypted_element;
};

console.log('Encrypted message - ', encrypted_text);