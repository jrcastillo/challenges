const Promise = require('bluebird');
const axios = require('axios');

const URL = 'https://api-staging2.yalochat.com/awesome-bank/v1/messages'
const headers = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjEwMjk3NDAsImlzcyI6InBzVFBMU0VPeWdEWmdTOFE2UEswSjlHMlRiV1RFVjZjIn0.rcD2SsM8G6BP1LEVoeOJ3FEBpJAB0BzYPuGpcp-jlM0',
  'Content-Type': 'application/json'
}
const POST_METHOD = 'POST'


async function doRequest(url, body, method) {
  const options = {
    method: POST_METHOD,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjEwMjk3NDAsImlzcyI6InBzVFBMU0VPeWdEWmdTOFE2UEswSjlHMlRiV1RFVjZjIn0.rcD2SsM8G6BP1LEVoeOJ3FEBpJAB0BzYPuGpcp-jlM0`,
      'Content-Type': 'application/json'
    },
    data: body,
    url: URL,
  }
  return new Promise((resolve) => {
    setTimeout(resolve({response: {status: 200, body}}),getRandomArbitrary(1,1))
  })
}

let bufferList = []
async function requestLimiter(phonelist, maxRequestNumber) {
  while (phonelist.length > 0) {
      if(bufferList.length === 0){
        bufferList = phonelist.splice(0, maxRequestNumber);
      }
      if(bufferList.length < 21){
        bufferList.push(phonelist.shift())
      }
    handler()
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function handler() {
  while (bufferList.length > 0) {
    const body = bufferList.shift()
    await doRequest(URL, body.phone, POST_METHOD)
    .then(res => {
      if(res.status === 429) {
        bufferList.push(phone)
        console.log(`Sending to buffer, service unavailable ${res.response.phone}`)
      }
      console.log(`${JSON.stringify(body)}`)
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 401 || err.response.status === 403) {
        console.log(`Authentication error: ${JSON.stringify(err.response.data)}`)
      } else {
        console.log(`Generic Error: ${JSON.stringify(err.response.data)}`)
      }
    })
  }
}

async function requestHandler(phonelist) {
  return requestLimiter(phonelist, 20)
}

module.exports = {
  doRequest,
  requestHandler
}
