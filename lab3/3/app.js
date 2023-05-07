"use strict";

const readline = require('readline-sync');
const fs = require('fs');
const iconv = require('iconv-lite');

let text = readline.question('Enter the text - ');

const alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789%#-&$'
