"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');
const id_list = new Map();

let message = "This is a secret message"; // Заданная строка текста

function rotate(matrix) { 
    let size = matrix.length;
     let rotated = [];
      for (let i = 0; i < size; i++) {
         rotated.push([]);
         for (let j = 0; j < size; j++) {
             rotated[i][j] = matrix[size - j - 1][i];
             }
            } return rotated; 
            
        }

function generateGrid(size, rotations) { let grid = []; for (let i = 0; i < size; i++) { grid.push([]); for (let j = 0; j < size; j++) { grid[i][j] = 0; } } let currentRotation = 0; for (let i = 0; i < size; i++) { for (let j = 0; j < size; j++) { if (grid[i][j] === 0) { grid[i][j] = 1; grid[size - j - 1][i] = 1; grid[size - i - 1][size - j - 1] = 1; grid[j][size - i - 1] = 1; } if (currentRotation < rotations.length && rotations[currentRotation] === i * size + j) { grid[i][j] = '*'; currentRotation++; } } } return grid; }

function encrypt(message, size, rotations) { let grid = generateGrid(size, rotations); let encrypted = ""; let messageIndex = 0; for (let i = 0; i < size; i++) { for (let j = 0; j < size; j++) { if (grid[i][j] === 1) { if (messageIndex >= message.length) { encrypted += " "; } else { encrypted += message[messageIndex]; messageIndex++; } } else if (grid[i][j] === '*') { grid[i][j] = rotate([[grid[i - 1][j], grid[i][j - 1]], [grid[i + 1][j], grid[i][j + 1]]]); } } } return encrypted; }

console.log(encrypt(message, 6, [5, 10, 12])); // Шифрованный текст
