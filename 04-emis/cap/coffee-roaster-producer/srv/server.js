const cds = require('@sap/cds');
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    /* 
    *****************************
    * Set up Producer server.js
    *****************************
    */

    // Insert code here

    /*
    * End of Set up Producer server.js section
    */
});
module.exports = cds.server;
