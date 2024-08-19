const cds = require('@sap/cds');
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    /* 
    *****************************
    * Set up Producer server.js
    *****************************
    */

    // Insert code here
    const client = new AMQPClient(cds.env.requires.AMQP.brokerName, cds.env.requires.AMQP.credentials);
    client.connect().then(() => {
        client.registerPublisher(services['ebite.ProducerService'], ['topic://event-driven-integrations/e-bite/cap/ce/coffee/roasted/v1', 'topic://try-me']);
    });

    /*
    * End of Set up Producer server.js section
    */
});
module.exports = cds.server;
