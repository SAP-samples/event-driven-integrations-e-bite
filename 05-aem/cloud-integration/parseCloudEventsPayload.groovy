/*
* The script is responsible for parsing the CloudEvents payload and
* extracting the BusinessObject, Action and Object ID.
* It then generates the new topic based on these details.
*/

import com.sap.gateway.ip.core.customdev.util.Message
import java.util.HashMap

def Message parseCloudEventsPayload(Message message) {
    
    //Body
    def body = message.getBody(String)

    //Parse the body
    def json = new groovy.json.JsonSlurper().parseText(body)

    //Get the value of the CloudEvents attribute and data
    def ceType = json['type']
    def ceBusinessUserUUID = json['data']['BusinessPartnerUUID']

    println "CloudEvents type attribute: " +ceType

    //Split string by the character
    def ceTypeValues = ceType.split('\\.')

    println "ceTypeValues: " + ceTypeValues

    def businessObject = ceTypeValues[-3]
    def action = ceTypeValues[-2]
    def version = ceTypeValues[-1]

    //Concatenate the values
    def newTopic = businessObject + "/" + action + "/" + ceBusinessUserUUID

    //Include values in exchange properties
    message.setProperty('newTopic', newTopic)
    message.setProperty('BusinessObject', businessObject)
    message.setProperty('Action', action)
    message.setProperty('Version', version)
    
    return message
}


    