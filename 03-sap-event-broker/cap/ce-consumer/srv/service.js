const cds = require("@sap/cds");

class CloudEventService extends cds.ApplicationService {

  static saveEvent(entity, message) {

    // Sample message
    // var message = {
    //   event: "BusinessPartner.Changed",
    //   data: {
    //     BusinessPartner: "9980004802",
    //   },
    //   headers: {
    //     id: "bdd592a4-12ef-1eef-9e8a-807e34b2a801",
    //     kafkaoffset: "238",
    //     kafkapartition: "2",
    //     kafkatopic: "beb-st-system.ec61c0af0ed08c8416129fb715756690",
    //     sapconsumertenant: "709575b9-c01d-4d2e-81b8-5b9c71715b32",
    //     sapemtenantid: "0e078dc9-7a7c-4315-ba5b-3f50abd1d9de",
    //     source: "/default/sap.s4.beh/740267509",
    //     specversion: "1.0",
    //     time: "2024-09-21T19:59:31Z",
    //     type: "sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1",
    //   },
    // };

    console.log('Received event ', message.event, ' with data:', message.data);
    var headers = message.headers;

    try {
      INSERT.into(entity)
        .entries({
          ID: cds.utils.uuid(),
          event: message.event,
          messageId: headers.id,
          source: headers.source,
          specversion: headers.specversion,
          type: headers.type,
          headers: JSON.stringify(message.headers),
          payload: JSON.stringify(message.data),
        })
        .then((x) => {
          console.log("Inserted event into Events table");
        });
    } catch (error) {
      var errorDescription = error.name + ": " + error.message;
      console.log(errorDescription);
    }
  }

  async init() {
    console.log(`----------
CloudEventService initializing!
-----------`);

    const { Events } = this.entities;

    // CloudEventService.saveEvent(Events, message);

    /*
    **********************************
    * Business Partner events section
    **********************************
    */

    // Insert code here

    // End of Business Partner events section

    return super.init();
  }
}

module.exports = { CloudEventService };
