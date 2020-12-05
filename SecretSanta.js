var nodemailer = require('nodemailer');

// put your users names and email adresses into this 2d array 
let restraints = [["",""],["",""],["",""]]

// replace user and pass with your credentials. Change service to your email provider 
var transporter = nodemailer.createTransport({
    service: '',
    auth: {
      user: '',
      pass: ''
    }
  });

  // replace from: with your email
function sendEmails(users){
    let email = "HELLO "+ users.sender[0]+" IT APPEARS YOU HAVE BEEN QUESTED TO PURCHASE... "+(users.receiver)[0]+" A PREZZIE!"
    var mailOptions = {
        from: '',
        to: users.sender[1],
        subject: 'SECRET SANTA',
        text: email
      };
      transporter.sendMail(mailOptions, function(error, ){
        if (error) {
          console.log(error);
        } else {
            console.log("EMAIL SENT TO: ", (users.sender)[0])
        }
      });
}

var pair = function(arr) {
  var result = [];
  var recipients = arr.slice();
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var sender = arr[i];		
    var recipientIndex = Math.floor(Math.random() * recipients.length);
    while (recipients[recipientIndex] === sender) {
    	// Can't send gift to myself
      recipientIndex = Math.floor(Math.random() * recipients.length);
    }

    var recipient = recipients.splice(recipientIndex, 1)[0];
    result.push({
      sender: sender,
      receiver: recipient
    });
  }
  return result;
};

// sends emails to every user letting them know who they have to buy a present for
let index = pair(restraints).length 
for(let i=0; i < index; i++){
    sendEmails(pair(restraints)[i])
}
