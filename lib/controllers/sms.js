var twilio, client, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, sendSms

twilio = require('twilio');
TWILIO_ACCOUNT_SID = "ACf7c94c93dfeb48169cb24907f9593865";
TWILIO_AUTH_TOKEN = "42601495af736004aeae32fd2989d2ee";
TWILIO_NUMBER = "+16072164050"

client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

 var sendSms = function(toNumber, messageBody) {
  client.sendSms({
    to: toNumber, 
    from: TWILIO_NUMBER,
    body: messageBody
  }, function(error, message) {
    if(!error) {
      console.log('Success! The SID for this SMS message is:');
      console.log(message.sid);

      console.log("Message sent on:");
      console.log(message.dateCreated);
    }
    else {
      console.log("Oops! There was an error.");
    }
  });
}

module.exports = sendSms;