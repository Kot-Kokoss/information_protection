"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let fileContent = fs.readFileSync('text.txt', 'utf-8');

let text = readline.question('Enter the text or press 1 to read the text from the file - ');

if (text == 1) {
    text = fileContent;
};

console.log('Original message - ', text)

let password = '',
    characters_left = text.length;  

  while (characters_left != 0) {
    characters_left -= 1;
    let password_code = random(0, 255),
        bytes = new Uint8Array([password_code]),
        password_element = iconv.decode(Buffer.from(bytes), 'cp1251');
    password += password_element;
  };

console.log('Password - ', password);

let encrypted_text = '';

    for (let i = 0; i != text.length; i++) {
        let char_text = String(text[i]),
            char_password = String(password[i]);
        let buffer_text = iconv.encode(char_text, 'cp1251'),
            buffer_password = iconv.encode(char_password, 'cp1251');
        let code_text = buffer_text[0],
            code_password = buffer_password[0];
        let encrypted_code = code_text + code_password;
        
        if (encrypted_code > 255) {
            encrypted_code -= 256;
        };

        let bytes = new Uint8Array([encrypted_code]);
        let encrypted_element = iconv.decode(Buffer.from(bytes), 'cp1251');
        encrypted_text += encrypted_element;
    };

console.log('Encrypted message = ', encrypted_text);