
/*
 * GET home page.
 */
var accountSid = 'AC82a337a51664816de7928c15b857a57a'; 
var authToken = '2b15b2967968d5a4b6d0ddcefa3563b9'; 

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var unirest = require('unirest');
var yield = require('yield');
exports.index = function(req, res){
	var text = req.body.Body;
	console.log("Question revcieved with text: "+text);
	var from = req.body.From;

	//var request = require("request");
	//var question = "https://webknox-question-answering.p.mashape.com/questions/answers?answerLookup=false&answerSearch=false&question="+text;
	//var wolfram = require('wolfram-alpha').createClient("XKEPG9-PLE83Q7XAT",{output:"json"});

	var Client = require('node-wolfram');
	var Wolfram = new Client('XKEPG9-PLE83Q7XAT');
	var ans = "Sorry I didn't find that";
	Wolfram.query("American President", function(err, result) {
		if(err)
			console.log(err);
		else
		{
			for(var a=0; a<result.queryresult.pod.length; a++)
			{
				var pod = result.queryresult.pod[a];
				//console.log("SSS "+pod.$.title+" SSS",": ");
				if(pod.$.title == "Result"){
					for(var b=0; b<pod.subpod.length; b++)
					{
						var subpod = pod.subpod[b];
						for(var c=0; c<subpod.plaintext.length; c++)
						{
							var text = subpod.plaintext[c];
							ans = text;
							console.log('\t', text);
						}
					}
				}
			}
			client.messages.create({
				to: "+15102039956", 
				from: "+16579995558",
				body:ans,  
			}, function(err, message) { 
				console.log(message); 
				res.render('index', { title: 'Express' });
			});
		}
	});	


	/*request(question, function(error, response, body) {
	  console.log(body);
	  client.messages.create({
			to: "+15102039956", 
			from: "+16579995558",
			body:body,  
		}, function(err, message) { 
			console.log(message); 
			res.render('index', { title: 'Express' });
		});
	});
	 */

	/*unirest.get("https://webknox-question-answering.p.mashape.com/questions/answers?answerLookup=false&answerSearch=false&question="+text)
	.header("X-Mashape-Key", "EnZHUmLCJSmshGfBoO1bl9JUT1LMp1weRDljsnnk6zBED4xWLJ")
	.header("Accept", "application/json")
	.end(function (result) {

		console.log(result.status, result.headers, result.body);
	});*/


};