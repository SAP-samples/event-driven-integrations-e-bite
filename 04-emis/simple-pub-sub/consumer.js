const amqp = require("@sap/xb-msg-amqp-v100");

const options = require("./options");

const client = new amqp.Client(options);

stream = client.receiver("Subscriber").attach("queue:queue-CE");

stream
  .on("ready", () => {
    console.log("ready");
  })
  .on("data", (message) => {
    console.log("data", message);
    var payload = JSON.parse(message.payload.toString("utf8"));
    console.log(`Received the following message: ${JSON.stringify(payload)}`);
    message.done();
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
