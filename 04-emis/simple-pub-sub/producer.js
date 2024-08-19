"use strict";

const options = require("./options");
const { CloudEvent } = require("cloudevents");

/* 
*************************
* Create Producer client
*************************
*/

// Insert code here

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
