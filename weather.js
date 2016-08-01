var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.set('port', (process.env.PORT || 9001));

app.get('/', function(req, res){
  res.send('It Works!');
});

app.post('/post', function(req, res){
  var parsed_url = url.format({
    pathname: 'http://api.openweathermap.org/data/2.5/weather',
    query: {
      zip: req.body["text"],
      appid: process.env.WEATHER_ACCESS,
    }
  });

  request(parsed_url, function(error, response, body){
    if (!error && response.statusCode == 200){
      var data = JSON.parse(body);
      var temp = data["main"]["temp"];

      res.send({text: temp});
    }
  });
});

app.listen(app.get('port'), function() {
   console.log('Node app is running on port', app.get('port'));
});
