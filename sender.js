
const Promise = require('bluebird');
const requester = require('./requester');
const readDirectory = require('./readDirectory');
const csvParser = require('./csvParser');
const testPath = `${process.cwd()}/sendTodir/testdata`;

async function sendPayload(path) {
  const filenames = readDirectory(path || testPath);
  return Promise.map(filenames, async (name) => {
    const csv = await csvParser(`${testPath}/${name}`)
    return requester.requestHandler(csv)
  }, {concurrency: 1})
}

module.exports = sendPayload