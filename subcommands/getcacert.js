/**
 * Subcommand 'getcacert'
 */


var log = require('fancy-log');
var httpclient = require('./../httpclient.js');
var fs = require('fs');


var getcacert = function(ca, outfile, chain) {
    // get ca cert file
    log("Getting cert for " + ca + " CA  ...")

    if(chain) {
        log("Getting chain version ... ")
        chain = 'chain/';
    }

    httpclient.request('/ca/certs/' + ca + '/' + chain, 'GET', null)
        .then(function(response){
            log.info("Received HTTP response :-)");

            if(response.success) {
                log.info("Successfully received requested certificate :-)");

                if(typeof outfile === 'string') {
                    // Write certificate to file
                    fs.writeFileSync(outfile, response.cert);
                    log("Cert written to " + outfile);
                } else {
                    console.log("\r\n\r\n" + response.cert + "\r\n");
                }
            } else {
                log.error("Could not get requested certificate:");
                log.error(JSON.stringify(response.errors));
            }
        })
        .catch(function(error){
            log.error("HTTP request failed: " + error);
        });
};

module.exports = getcacert;