const cds = require('@sap/cds');

/*
*************************
* Handle event received
*************************
*/

// Insert code here
const queue = 'queue://queue-CAP';
const tryMeTopic = 'topic://try-me';

module.exports = async (srv) => {
    srv.on(queue, async req => {
        console.log('received >', req.event, req.data);
    });
}
// End of Handle event received section