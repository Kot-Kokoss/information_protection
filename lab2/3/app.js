"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

let fileContent = fs.readFileSync('text.txt', 'utf-8');

let encr_or_decr = readline.question('For encryption, enter 1, for decryption, enter 2 - ');
let text = readline.question('Enter the text or press 1 to read the text from the file - ');
const alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789%#-&$';

if (text == 1) {
    text = fileContent;
};

let password = '',
    characters_left = text.length;  

  while (characters_left != 0) {
    password += alphabet[random(0, 66)];
    characters_left -= 1;
  };

if (encr_or_decr == 1) {
    let encrypted_text = '',
        text_element_encrypted;

    for (let i = 0; i != text.length; i++) {
        let text_element = text[i],
            sum_mod = alphabet.indexOf(text_element) + alphabet.indexOf(password[i]);  
        if (sum_mod >= 67) {
            text_element_encrypted = alphabet[sum_mod - 67];
        } else {
            text_element_encrypted = alphabet[sum_mod];
        };

        encrypted_text += text_element_encrypted;
    };

    console.log('Encrypted text = ' + encrypted_text);
    console.log('Password = ' + password);
};

if (encr_or_decr == 2) {
    let decrypted_text = text;
        
    // for (let i = 0; i != text.length; i++) {
    //     let text_element = text[i],
    //         text_element_index = text.indexOf(text_element) - encrypted_step;  
        
    //     if (text_element_index < 0) {
    //         text_element_index = text.length - (encrypted_step - Math.abs(0 - text.indexOf(text_element)));
    //     };
    //     decrypted_text += text[text_element_index];
    // };

    console.log(decrypted_text);
}

