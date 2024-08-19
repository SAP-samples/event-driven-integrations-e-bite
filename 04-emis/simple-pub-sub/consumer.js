"use strict";

const options = require("./options");

const { Client } = require("@sap/xb-msg-amqp-v100");

/* 
*************************
* Create Consumer client
*************************
*/

// Insert code here

/*
* End of Create Consumer Client section
*/

// Attach event listeners to the stream
stream
  .on("ready", () => {
    console.log("ready");
  })
  .on("data", (message) => {

    /* 
    **************************
    * Handle event received
    **************************
    */

    // Insert code here
    
    /*
    * End of Handle event received section
    */
  })
  .on("finish", () => {
    console.log("finish");
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
    console.log(
      "connection lost, trying to reconnect in " + MSG_RETRY_MS + " ms"
    );
    setTimeout(client.connect.bind(client), MSG_RETRY_MS);
  });

client.connect();
