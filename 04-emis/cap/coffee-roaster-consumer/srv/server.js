const cds = require('@sap/cds');
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    const client = new AMQPClient(cds.env.requires.AMQP.brokerName, cds.env.requires.AMQP.credentials);
    client.connect().then(() => {
        client.registerSubscriber(services['ebite.ConsumerService'], ['queue://queue-CAP']);
    });
});
module.exports = cds.server;
