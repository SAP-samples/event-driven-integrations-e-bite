const assert = require("assert");
const AMQP = require("@sap/xb-msg-amqp-v100");

module.exports = class AMQPClient {
  /**
   * CAP Nodejs using the AMQP protocol. This class is a wrapper around the @sap/xb-msg-amqp-v100 library.
   */
  constructor(clientName, credentials, useJSON = true) {
    this.clientName = clientName;
    this.connectionInfo = credentials;
    this.broker = null;
    assert(
      this.connectionInfo,
      "No connection details specified in credentials"
    );
  }

  /**
   * Connects the client to the cloud broker. Connection details should be specified in cds.requires.AMQP.credentials
   */
  connect = () => {
    assert(this.broker == null, "Broker is already connected.");
    this.broker = new AMQP.Client(this.connectionInfo);

    console.log(`${this.clientName} > Starting`);
    return new Promise((resolve, reject) => {
      this.broker.connect();
      resolve();
    });
  };

  /**
   * Disconnects the Broker client with appropriate Close performatives and TCP socket teardowns.
   */
  disconnect = () => {
    assert(this.broker, "Broker is not connected.");
    console.log(`${this.clientName} > Stopping`);
    return this.broker.disconnect();
  };

  /**
   * Creates an Broker receiver which will receive events on the specified topics.
   * @param {Service} service CDS Service that should receive events on the topics. This name should include the namespace.
   * @param {String[]} topics Name (or array of names) of topics that should be received.
   */
  registerSubscriber = (service, topics = []) => {
    assert(this.broker, "Broker is not connected.");
    (Array.isArray(topics) ? topics : [topics]).forEach((topic) => {
      const receiver = this.broker.receiver(topic).attach(topic);
      console.log(`${this.clientName} > Receiver created for ${topic}`);

      receiver.on("error", (err) => {
        return new Error(err);
      });
      receiver.on("data", (msg) => {
        console.log(`${this.clientName} > Received on topic ${topic}`);
        const data = msg.payload.data || msg.payload.toString("utf-8");
        service.emit(topic, JSON.parse(data));
        return msg.done();
      });
    });
  };

  /**
   * Creates an Broker sender which can send events on the specified topics.
   * @param {Service} service CDS Service that would emit events on the topics. This name should include the namespace.
   * @param {String[]} topics Name (or array of names) of topics that the service would be sent.
   */
  registerPublisher = (service, topics) => {
    assert(this.broker, "Broker is not connected.");
    (Array.isArray(topics) ? topics : [topics]).forEach((topic) => {
      const stream = this.broker.sender(topic).attach(topic, "", 100000);
      console.log(`${this.clientName} > Sender created for ${topic}`);

      service.on(topic, (msg) => {
        console.log(`${this.clientName} > Sending to topic ${topic}`);
        stream.write({
          payload: Buffer.from(JSON.stringify(msg.data), "utf-8"),
        });
      });
    });
  };
};
