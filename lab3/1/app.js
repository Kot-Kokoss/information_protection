"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');

let text = readline.question('Enter the text - '),
    block_len = readline.question('Enter block length - '),
    block_mask = readline.question('Enter block mask - '),
    starting_text_lenght = text.length;

if (Math.floor(text.length / block_len) < text.length / block_len) {
    let need_characters = (Math.floor(text.length / block_len) + 1) * block_len;
    for (let i = 0; text.length != need_characters; i++) {
        text += text[i];
    };
};

let blocks = [],
    encrypted_text = '';
    
for (let i = 0; i < text.length + 1; i ++) {
    blocks.push(text.slice(0, block_len));
    text = text.slice(block_len);
};

for (let i = 0; i < blocks.length; i ++) {
    const encrypted_block_id = new Map();
    let block = blocks[i],
        encrypted_block = '';
    
    for (let i = 0; i < block_len; i ++) {
        encrypted_block_id.set(block_mask[i], block[i])
    };
    
    for (let i = 0; i < block_len; i ++) {
        encrypted_block += encrypted_block_id.get(String(i + 1));
    };
    
    encrypted_text += encrypted_block; 
};

console.log('Encrypted message - ', encrypted_text.slice(0, starting_text_lenght));

let encrypted_blocks = [];

for (let i = 0; i < encrypted_text.length + 1; i ++) {
    encrypted_blocks.push(encrypted_text.slice(0, block_len));
    encrypted_text = encrypted_text.slice(block_len);
};

let decrypted_text = '';

for (let i = 0; i < blocks.length; i ++) {
    const decrypted_block_id = new Map();
    let block = encrypted_blocks[i],
        decrypted_block = '';
    
    for (let i = 0; i < block_len; i ++) {
        let decrypted_place = block[block_mask[i] - 1];
        decrypted_block += decrypted_place;
    };
        
    decrypted_text += decrypted_block; 
};

console.log('Decrypted message - ', decrypted_text.slice(0, starting_text_lenght));