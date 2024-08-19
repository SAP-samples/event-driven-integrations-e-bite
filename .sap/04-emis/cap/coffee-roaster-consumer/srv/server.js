const cds = require('@sap/cds');

/*
*************************
* Create Consumer client
*************************
*/

// Insert code here
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    const client = new AMQPClient(cds.env.requires.AMQP.brokerName, cds.env.requires.AMQP.credentials);
    client.connect().then(() => {
        client.registerSubscriber(services['ebite.ConsumerService'], ['queue://queue-CAP']);
    });
});
// End of Create Consumer Client section

module.exports = cds.server;
