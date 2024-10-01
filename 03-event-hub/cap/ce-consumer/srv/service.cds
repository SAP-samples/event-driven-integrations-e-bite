using cap.cloudevents as ce from '../db/data-model';


service CloudEventService {
  entity Events as projection on ce.ConsumedMessage{
    ID,
    event,
    messageId,
    source,
    specversion,
    type,
    headers,
    payload,
    createdAt
  };
}

/**
 * filling in missing events as found on SAP Business Accelerator Hub
 */
using { API_BUSINESS_PARTNER as S4 } from './external/API_BUSINESS_PARTNER';
extend service S4 with {
  event BusinessPartner.Created @(topic:'sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1') {
    BusinessPartner : String
  }
  event BusinessPartner.Changed @(topic:'sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1') {
    BusinessPartner : String
  }
}
annotate S4 with @protocol: 'none';

