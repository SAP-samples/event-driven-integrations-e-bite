const cds = require('@sap/cds');
const {
    CloudEvent,
  } = require("cloudevents");
const eventTopic = 'topic://event-driven-integrations/e-bite/cap/ce/coffee/roasted/v1';
// const eventTopic = 'queue:queue-CAP';

module.exports = async (srv) => {

    function randomEnumValue(enumStr) {
        var obj = Object.keys(srv.model.definitions[enumStr].enum);
        return obj[Math.floor(Math.random() * obj.length)];
    }

    function getRandomNumber(uom) {
        let min, max;
        switch (uom) {
            case 'g':
                min = 100;
                max = 1000;
                break;
            case 'kg':
                min = 1;
                max = 25;
                break;
            default:
                throw new Error('Invalid UOM');
        }
        return Math.random() * (max - min) + min;
    }

    srv.on('produceEvent', async req => {

        const type = 'event-driven-integrations.e-bite.coffee.roasted.v1';
        const source = 'event-driven-integrations/e-bite/cap/producer';
        
        const uom = randomEnumValue('ebite.UOM');
        
        const data = {
            country: randomEnumValue('ebite.ProducingCountry'),
            process: randomEnumValue('ebite.ProcessingMethod'),
            species: randomEnumValue('ebite.Species'),
            variety: randomEnumValue('ebite.Variety'),
            quantity: getRandomNumber(uom),
            uom: uom
        };

        // Create a new CloudEvent
        const ce = new CloudEvent({ type, source, data });

        console.log(ce);

        await srv.emit(eventTopic, ce);
        req.notify(`Event sent > ${eventTopic}`);        
    });
}