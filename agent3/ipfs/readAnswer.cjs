const fs = require('fs/promises');
const request = require('request')
const ENV = require('../../ENV.json');
const url = ENV.lighthouseUrl

const cid = process.argv[2];

async function main() {
  var timeoutInMilliseconds = 10*1000
  var opts = {
    url: url + cid.toString(),
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