const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');
code = code.replace('allow update: if true;', '');
fs.writeFileSync('firestore.rules', code);
