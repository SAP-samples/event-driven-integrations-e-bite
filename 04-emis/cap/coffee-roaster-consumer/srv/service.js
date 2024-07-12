const cds = require('@sap/cds');
const queue = 'queue:queue-CAP';

module.exports = async (srv) => {
    srv.on(queue, async req => {
        console.log('received >', req.event, req.data);
    });
}