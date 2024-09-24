using {
  cuid,
  managed
} from '@sap/cds/common';

namespace cap.cloudevents;

entity ConsumedMessage : cuid, managed {
  event             : String not null;
  messageId         : String not null;
  source            : String not null;
  specversion       : String not null;
  type              : String not null;
  headers           : String not null;
  payload           : String;
}

