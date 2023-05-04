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

let encrypted_text = '',
    decrypted_text = '';

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

for (let i = 0; i != encrypted_text.length; i++) {
    let char = String(encrypted_text[i]);
    let buffer = iconv.encode(char, 'cp1251');
    let code = buffer[0];
    let decrypted_code = code - encrypted_step;
    
    if (decrypted_code < 0) {
        decrypted_code = 255 + decrypted_code;
    };

    let bytes = new Uint8Array([decrypted_code]);
    let decrypted_element = iconv.decode(Buffer.from(bytes), 'cp1251');
    decrypted_text += decrypted_element;
};

console.log('Encrypted message -', encrypted_text);
console.log('Decrypted message -', decrypted_text);