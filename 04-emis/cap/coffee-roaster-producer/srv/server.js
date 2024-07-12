const cds = require('@sap/cds');
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    const client = new AMQPClient(cds.env.requires.AMQP.brokerName, cds.env.requires.AMQP.credentials);
    client.connect().then(() => {
        client.registerPublisher(services['ebite.ProducerService'], ['topic://event-driven-integrations/e-bite/cap/ce/coffee/roasted/v1', 'topic://try-me']);
    });
});
module.exports = cds.server;
