"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
let fileContent = fs.readFileSync('text.txt', 'utf-8');

let text = readline.question('Enter the text or press 1 to read the text from the file - ');
let encrypted_key = (readline.question("Enter the encryption key - "));

if (text == 1) {
    text = fileContent;
};

console.log('Original message - ', text)

if (text.length > encrypted_key.length) {

    while (text.length > encrypted_key.length) {
        encrypted_key += encrypted_key;
    };

    let tail = encrypted_key.length - text.length;
    encrypted_key = encrypted_key.slice(0, -tail);
    
    console.log('Encrypted key - ', encrypted_key);
};

let encrypted_text = '';
        
    for (let i = 0; i != text.length; i++) {
        let char_text = String(text[i]),
            char_key = String(encrypted_key[i]);
        let buffer_text = iconv.encode(char_text, 'cp1251'),
            buffer_key = iconv.encode(char_key, 'cp1251');
        let code_text = buffer_text[0],
            code_key = buffer_key[0];
        let encrypted_code = code_text + code_key;
        
        if (encrypted_code > 255) {
            encrypted_code -= 256;
        };

        let bytes = new Uint8Array([encrypted_code]);
        let encrypted_element = iconv.decode(Buffer.from(bytes), 'cp1251');
        encrypted_text += encrypted_element;
    };

    console.log('Encrypted message - ', encrypted_text);