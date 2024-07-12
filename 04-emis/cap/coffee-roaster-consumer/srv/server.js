const cds = require('@sap/cds');
const AMQPClient = require('../../../../assets/XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    const EMISClient = new AMQPClient("EMIS", cds.env.requires.AMQP.credentials);
    EMISClient.connect().then(() => {
        EMISClient.registerSubscriber(services['ebite.ConsumerService'], 'queue:queue-CAP');
    });
});
module.exports = cds.server;
