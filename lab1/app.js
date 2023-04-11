"use strict";

const readline = require('readline-sync');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pass_lenth = readline.question("Enter the password length - ");
let pass_number = readline.question("Enter the number of passwords - ");
const encrypted_step = Number(readline.question("Enter the encryption step - "));
const alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789%#-&$';

fs.open('password_storage.txt', 'a', (err) => {
  if(err) throw err;
  console.log('File created');
});

while (pass_number != 0) {
  pass_number -= 1;

  let password = '',
    characters_left = pass_lenth;  

  while (characters_left != 0) {
    password += alphabet[random(0, 66)];
    characters_left -= 1;
  };

  console.log(password);
  let encrypted_password = '';

  for (let i = 0; i != pass_lenth; i++) {
    let pass_element = password[i],
        pass_element_index = alphabet.indexOf(pass_element) + encrypted_step;
    if (pass_element_index > 66) {
      pass_element_index -= 67;
    }
    encrypted_password += alphabet[pass_element_index];
  }
  
  //write pass in txt-file
  fs.appendFile('password_storage.txt', encrypted_password + '\n', (err) => {
    if(err) throw err;
    console.log('Data has been added!');
});
};