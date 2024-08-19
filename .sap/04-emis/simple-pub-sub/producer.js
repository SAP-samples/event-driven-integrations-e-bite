"use strict";

const options = require("./options");
const { CloudEvent } = require("cloudevents");

/* 
*************************
* Create Producer client
*************************
*/

// Insert code here
const { Client } = require("@sap/xb-msg-amqp-v100");

const client = new Client(options);
const stream = client
    .sender("out")
    .attach("topic:event-driven-integrations/e-bite/nodejs/ce/coffee/roasted/v1", "", 100000);

/*
* End of Create Producer Client section
*/

/**
 * Callback function called when an AMQP message is successfully sent.
 * @param {Object} message - The sent message object.
 * @returns {void}
 */
function onSendDone(message) {
    console.log("AMQP message sent");
    console.log(message);

    client.disconnect();
}

/**
 * Callback function called when an AMQP message fails to send.
 * @param {Error} error - The error object representing the failure.
 * @param {Object} message - The message object that failed to send.
 * @returns {void}
 */
function onSendFailed(error, message) {
    console.log("message failed", error.message);
}

/* 
**********************
* Publish Event
***********************
*/

// Insert code here
function send() {
    const source = "event-driven-integrations/e-bite/nodejs"
    const type = "event-driven-integrations.e-bite.coffee.roasted.v1"
    const data = {
        country: "Honduras",
        process: "Washed",
        species: "Arabica",
        variety: ["Caturra", "Catuai", "Lempira", "IHCAFE 90 und Parainema"],
        quantity: 350,
        uom: "g"
    };

    const ce = new CloudEvent({ type, source, data });

    console.log("CloudEvents message to be sent: \n" + JSON.stringify(ce, null, 4));

    var payload = {};

    // Structured format
    payload = {
        chunks: [
            Buffer.from(
                JSON.stringify(ce)
            ),
        ],
        type: "application/cloudevents+json",
    };
    
    const message = {
        payload: payload,
        done: () => onSendDone(message),
        failed: (error) => onSendFailed(error, message),
    };

    stream.write(message);
}

/*
* End of Publish Event section
*/

// Attach event listeners to the stream
stream
    .on("ready", () => {
        send();
    })
    .on("drain", () => {
        send();
    })
    .on("finish", () => {
        client.disconnect();
    });

client
    .on("connected", (destination, peerInfo) => {
        console.log("connected", peerInfo.description);
    })
    .on("assert", (error) => {
        console.log(error.message);
    })
    .on("error", (error) => {
        console.log(error.message);
    })
    .on("reconnecting", (destination) => {
        console.log("reconnecting, using destination " + destination);
    })
    .on("disconnected", (hadError, byBroker, statistics) => {
        console.log("disconnected");
    });

client.connect();
