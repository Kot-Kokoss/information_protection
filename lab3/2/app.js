"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
const id_list = new Map();

let matrix_size = readline.question('Enter matrix size X*X, x - '),
    text = readline.question('Enter the text - '),
    matrix = [],
    matrix_mask = [[1,0,0,1,1,0],
                   [0,1,0,0,0,0],
                   [0,0,1,0,1,0],
                   [0,0,0,0,0,1],
                   [1,0,1,0,0,0],
                   [0,0,0,1,0,0]];
text = 'thequickbrownfoxjumpsoverthelazydogs';
if (Math.floor(text.length / matrix_size) < text.length / matrix_size) {
    let need_characters = (Math.floor(text.length / matrix_size) + 1) * matrix_size;
    for (let i = 0; text.length != need_characters; i++) {
        text += text[i];
    };
};

for (let i = 1; i != 4; i ++) {

    // for (let i = 0; i < matrix_size; i ++) {
    //     let matrix_string = [];
    //     for (let j = 0; j < matrix_size; j ++) {
    //         if (matrix_mask[i][j] == 1) {
    //             matrix_string.push(text[0]);
    //             text = text.slice(1);
    //         } else {
    //             matrix_string.push(0);
    //         }
    //     }
    
    //     matrix.push(matrix_string);
    // }
    console.log(matrix_mask);

    let new_matrix_mask = matrix_mask;

    for (let i = 0; i < matrix_size; i ++) {
        for (let j = 0; j < matrix_size; j ++) {
            new_matrix_mask[j][matrix.size - 1 - i] = matrix_mask[i][j];
        }
    }
    
    // console.log(matrix);
}

// let matrix_string = [];
// for (let i = 0; i < matrix_size; i ++) {
//     matrix_string.push(0);
// }

