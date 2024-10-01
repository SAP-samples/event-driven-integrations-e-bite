# Cloud Event Consumer

This is a sample CAP application configure to easily connect to SAP Cloud Application Event Hub for SAP cloud applications.

Unfortunately, it is not possible to connect SAP Cloud Application Event Hub to a project running locally. The project will need to be deployed to SAP BTP in order to connect to SAP Cloud Application Event Hub.

## Next Steps

Open a new terminal and run the following commands
```bash
# Login to CloudFoundry
$ cf login --sso

# Build and deploy to BTP
$ npm run build
$ npm run deploy

# To clean up resources
$ npm run undeploy
```

To access the OData services, navigate to https://<app-route>.cfapps.<region>.hana.ondemand.com/odata/v4/cloud-event/Events

## Learn More

Learn more at https://www.sap-press.com/developing-event-driven-integrations-with-sap-btp_6021/.
