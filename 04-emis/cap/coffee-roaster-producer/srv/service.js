const { CloudEvent } = require("cloudevents");

const coffeeRoastedEventTopic =
    "topic://event-driven-integrations/e-bite/cap/ce/coffee/roasted/v1";
const tryMeEventTopic = "topic://try-me";

const ceSource = "event-driven-integrations/e-bite/cap/producer";

/**
 * Handles the CoffeeBatchRoastedEvent and emits a CloudEvent with the roasted coffee batch details.
 *
 * @param {import("@sap/cds").Service} srv - The CDS service instance.
 */
module.exports = async (srv) => {
    /**
     * Generates a random value from an enum definition.
     *
     * @param {string} enumStr - The name of the enum definition.
     * @returns {string} - A random value from the enum.
     */
    function randomEnumValue(enumStr) {
        var obj = Object.keys(srv.model.definitions[enumStr].enum);
        return obj[Math.floor(Math.random() * obj.length)];
    }

    /**
     * Generates a random number within a specified range based on the unit of measurement (UOM).
     *
     * @param {string} uom - The unit of measurement.
     * @returns {number} - A random number within the specified range.
     * @throws {Error} - If the UOM is invalid.
     */
    function getRandomNumber(uom) {
        let min, max;
        switch (uom) {
            case "g":
                min = 100;
                max = 1000;
                break;
            case "kg":
                min = 1;
                max = 25;
                break;
            default:
                throw new Error("Invalid UOM");
        }
        return Math.random() * (max - min) + min;
    }

    /**
     * Event handler for the CoffeeBatchRoastedEvent.
     *
     * @param {import("@sap/cds").Request} req - The CDS request object.
     */
    srv.on("CoffeeBatchRoastedEvent", async (req) => {
        const type = "event-driven-integrations.e-bite.coffee.roasted.v1";
        const uom = randomEnumValue("ebite.UOM");

        const data = {
            country: randomEnumValue("ebite.ProducingCountry"),
            process: randomEnumValue("ebite.ProcessingMethod"),
            species: randomEnumValue("ebite.Species"),
            variety: randomEnumValue("ebite.Variety"),
            quantity: getRandomNumber(uom),
            uom: uom,
        };

        // Create a new CloudEvent
        const ce = new CloudEvent({ type, source: ceSource, data });

        console.log(ce);

        await srv.emit(coffeeRoastedEventTopic, ce);
        req.notify(`Event sent > ${coffeeRoastedEventTopic}`);
    });

    /**
     * Event handler for the TryMeEvent.
     *
     * @param {import("@sap/cds").Request} req - The CDS request object.
     * @returns {string} - The message sent in the event.
     */
    srv.on("TryMeEvent", async (req) => {
        const type = "event-driven-integrations.e-bite.try-me.v1";
        const message = "¡Hola Mundo!";

        const data = {
            message: message,
        };

        // Create a new CloudEvent
        const ce = new CloudEvent({ type, source: ceSource, data });

        console.log(ce);

        await srv.emit(tryMeEventTopic, ce);
        req.notify(`Event sent > ${tryMeEventTopic}`);

        return message;
    });
};
