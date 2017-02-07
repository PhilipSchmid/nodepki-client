/**
 * Subcommand "get" to receive a certificate by serial number
 */

var log = require('fancy-log');
var httpclient = require('./../httpclient.js');


var get = function(serialno) {
    log.info("Requesting issued certificate by serial number.");

    httpclient.request('/certificates/' + serialno + '/', 'GET', null)
        .then(function(response){
            log.info("Received HTTP response :-)");

            if(response.success) {
                log.info("Successfully received requested certificate :-)");

                console.log("\r\n\r\n" + response.cert + "\r\n");
            } else {
                log.error("Could not get requested certificate:");
                log.error(JSON.stringify(response.errors));
            }
        })
        .catch(function(error){
            log.error("HTTP request failed: " + error);
        });
};


module.exports = get;
