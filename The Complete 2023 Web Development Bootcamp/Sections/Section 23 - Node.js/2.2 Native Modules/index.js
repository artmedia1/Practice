const fs = require("fs");

const data = new Uint8Array(Buffer.from('Took you long enough!'));
fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
}); 