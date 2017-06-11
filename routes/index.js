
/*
 * GET home page.
 */
var accountSid = 'AC82a337a51664816de7928c15b857a57a'; 
var authToken = '2b15b2967968d5a4b6d0ddcefa3563b9'; 

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var unirest = require('unirest');
exports.index = function(req, res){
	var text = req.body.Body;
	console.log("Question revcieved with text: "+text);
	
	unirest.get("https://webknox-question-answering.p.mashape.com/questions/answers?answerLookup=false&answerSearch=false&question="+text)
	.header("X-Mashape-Key", "EnZHUmLCJSmshGfBoO1bl9JUT1LMp1weRDljsnnk6zBED4xWLJ")
	.header("Accept", "application/json")
	.end(function (result) {
		client.messages.create({
			to: "+15102039956", 
			from: "+16579995558",
			body: result.body,  
		}, function(err, message) { 
			console.log(message); 
			res.render('index', { title: 'Express' });
		});
		console.log(result.status, result.headers, result.body);
	});
		
  
};