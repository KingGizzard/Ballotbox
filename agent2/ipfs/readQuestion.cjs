const fs = require('fs/promises');
const request = require('request')
const ENV = require('../../ENV.json');
const url = ENV.lighthouseUrl

async function main() {
  const cid = await fs.readFile('../agent1/ipfs/cid.txt');

  var timeoutInMilliseconds = 10*1000
  var opts = {
    url: url + cid,
    timeout: timeoutInMilliseconds
  }

  request(opts, function (error, response, body) {
    if (!error) {
      console.log(body);
    } else {
      console.log(error);
    }
  });

}
main()