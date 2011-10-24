var express = require('express');

var nohm = require('nohm').Nohm;
var redisClient = require('redis').createClient();
nohm.setClient(redisClient);

nohm.setPrefix('b507');
var redisClient = require('redis').createClient();
nohm.setClient(redisClient);


var Location = nohm.model('Location', {
	properties: {
	    latitude: {
	      type: 'float',
	      unique: false,
	      validations: [
	        ['notEmpty']
	      ]
	    },
		longitude: {
	      type: 'float',
	      unique: false,
	      validations: [
	        ['notEmpty']
	      ]
	    },
		timestamp: {
	      type: 'string',
	      unique: false,
	      validations: [
	        ['notEmpty']
	      ]
	    }}});

var app = express.createServer(express.logger());

app.use(express.bodyParser());

app.put('/', function(req, res) {
	
	
  var location = new Location;
  location.p("timestamp", req.body.timestamp);
  location.p("latitude", req.body.latitude);
  location.p("longitude", req.body.longitude);
	
  
  if(location.valid()){	
  	location.save(function (err) {
	  	if (!err) {
		    console.log("data is saved!");
		  } else {		
		   console.log("there were errors!");
		  }
	  });
  }else{
	console.log(location.errors);	
  }
	
  res.contentType('json');
  res.send(JSON.stringify({ status: "success" }));
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});