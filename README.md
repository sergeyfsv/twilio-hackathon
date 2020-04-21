# twilio-hackathon
Twilio April Hackathon 2020

## Intro
This application has been deployed to IBM Cloud  and to its Cloud Foundary infrastrucure. Testing locally is also possible, but you will ned to create your own instance of IBM Watson Assistant and make sure that its name is "Watson Assistant-mn".
You can configure the name of IBM Watson Assistant service in /credentials/mapping.json. Just replace "cloudfoundry:Watson Assistant-mn" to the value that is valid for you.

The deployed version of the application is available at:
https://hwbot.eu-gb.mybluemix.net/

## Attention: it is hosted on a free tier with its limitations for requests per second. So, in case of any inconvenices - sorry.

## Twilio configuration
Twilio configuration is mainly in configuring SMS Messageing Service and its WhatsApp beta functionality.
You have to specify the webhook URL 
https://hwbot.eu-gb.mybluemix.net/sms


## How to build
The steps are standard for all node.js applications:
- npm install
- npm build
- npm serve
