const cds = require('@sap/cds');
const queue = 'queue://queue-CAP';
const tryMeTopic = 'topic://try-me';

module.exports = async (srv) => {
    srv.on(queue, async req => {
        console.log('received >', req.event, req.data);
    });

    // srv.on(tryMeTopic, async req => {
    //     console.log('received >', req.event, req.data);
    // });
}