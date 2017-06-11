
/*
 * GET home page.
 */
var accountSid = 'AC82a337a51664816de7928c15b857a57a'; 
var authToken = '2b15b2967968d5a4b6d0ddcefa3563b9'; 

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

exports.index = function(req, res){
	var text = req.body.Body;
	console.log("Question revcieved with text: "+text);
	client.messages.create({
		to: "+15102039956", 
		from: "+16579995558",
		body: text,  
	}, function(err, message) { 
		console.log(message); 
		res.render('index', { title: 'Express' });
	});	
  
};