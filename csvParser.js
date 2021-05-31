const csv = require('neat-csv');
const fs = require('fs');

async function processFile(path) {
  return await csv(fs.createReadStream(path))
}

module.exports = processFile