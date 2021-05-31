
const Promise = require('bluebird');
const requester = require('./requester');
const readDirectory = require('./readDirectory');
const csvParser = require('./csvParser');

async function sendPayload(path) {
  const filenames = readDirectory(path);
  return Promise.map(filenames, async (name) => {
    const csv = await csvParser(`${path}/${name}`)
    return requester.requestHandler(csv)
  }, {concurrency: 1})
}

module.exports = sendPayload