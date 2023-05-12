"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');

let matrix_size = 6,
    text = readline.question('Enter the text - '),
    matrix = [[0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0]],
    matrix_mask = [[1,0,0,0,1,0],
                   [0,1,0,0,0,0],
                   [0,0,1,0,1,0],
                   [0,0,0,0,0,1],
                   [1,0,1,0,0,0],
                   [0,0,0,1,0,0]],
    starting_text_lenght = text.length;

let blocks = [],
    need_len;

if ((text.length / 36) > Math.floor(text.length / 36)) {
    need_len = (Math.floor(text.length / 36) + 1) * 36;
}

for (let i = 0; text.length < need_len; i++) {
    text += text[i]
}

for (let i = 0; i < text.length + 1; i ++) {
    blocks.push(text.slice(0, 36));
    text = text.slice(36);
}

//Encryption
let encrypted_text = '';

for (let i = 0; i < blocks.length; i++) {
    text = blocks[i]
 
    for (let i = 0; i != 4; i ++) {

        for (let i = 0; i < matrix_size; i ++) {

            for (let j = 0; j < matrix_size; j ++) {
                if (matrix_mask[i][j] == 1) {
                    matrix[i][j] = text[0];
                    text = text.slice(1);
                } 
            }
        }
        // console.log(matrix_mask)
        let new_matrix_mask = [];

        for (let i = 0; i < matrix_size; i++) {
            new_matrix_mask.push([]);
            for (let j = 0; j < matrix_size; j++) {
            new_matrix_mask[i].push(matrix_mask[matrix_size - j - 1][i]);
            }
        }

        matrix_mask = new_matrix_mask
        // console.log(matrix);
        // console.log('Remaining text -', text);
    }

    let encrypted_block = '';

    for (let i = 0; i < matrix_size; i++) {
        for (let j = 0; j < matrix_size; j++) {
            encrypted_block += matrix[i][j];
        }
    }

    encrypted_text += encrypted_block;
}

console.log('Encrypted text -', encrypted_text.slice(0, starting_text_lenght))

//Decryption
let encrypted_blocks = [],
    decrypted_text = '';
    
for (let i = 0; i < encrypted_text.length + 1; i ++) {
    encrypted_blocks.push(encrypted_text.slice(0, 36));
    encrypted_text = encrypted_text.slice(36);
}

for (let i = 0; i < encrypted_blocks.length; i++) {
    encrypted_text = encrypted_blocks[i];

    for (let i = 0; i < matrix_size; i++) {
        for (let j = 0; j < matrix_size; j++) {
            matrix[i][j] = encrypted_text[0];
            encrypted_text = encrypted_text.slice(1);
        }
    }

    for (let i = 0; i != 4; i ++) {
        let new_matrix_mask = [];

        for (let i = 0; i < matrix_size; i++) {
            new_matrix_mask.push([]);
            for (let j = 0; j < matrix_size; j++) {
            new_matrix_mask[i].push(matrix_mask[j][matrix_size - i - 1]);
            }
        }

        matrix_mask = new_matrix_mask
        //console.log(matrix_mask);

        for (let i = 5; i > -1; i--) {
            for (let j = 5; j > -1; j--) {
                if (matrix_mask[i][j] == 1) {
                    text += matrix[i][j];
                } 
            }
        }

        //console.log('Decrypted part -', text);
    }

    let reversed_text = text.split("").reverse().join("");
    decrypted_text += reversed_text;
}

console.log('Decrypted text -', decrypted_text.slice(0, starting_text_lenght));