
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var querystring = require('querystring');
var request = require('request');
var sprintf = require('sprintf').sprintf;
var partials = require('express-partials');
var app = express();

var clientId = 'b9d842719872fc702226e594fb830761';
var clientSecret = 'e71336a0fbfc17f8cd5b6b399a304a08';

var hostBaseUrl = (process.env.HOST || 'http://localhost:3000');
var apiBaseUrl = process.env.SINGLY_API_HOST || 'https://api.singly.com';

var expressSingly = require('express-singly')(app, clientId, clientSecret,
  hostBaseUrl, hostBaseUrl + 'http://localhost:3000/results');

var sessionSecret = '1111';




app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
    app.locals.pretty = true;
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: sessionSecret
  }));
  expressSingly.configuration();
  app.use(app.router);
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get('/', routes.index);
app.get('/users', user.list);
app.get('/step2', function(req, res) {
  res.render('step2');
});

app.get('/results', function (req, res) {
  console.log(req.query.code);
  var code = req.query.code;
  request.post('https://api.singly.com/oauth/access_token', { form: {
                                                                      client_id: clientId,
                                                                      client_secret: clientSecret,
                                                                      code: code
                                                                    }
    }, function (error, response, body) {
      console.log(body);

      var token = JSON.parse(body).access_token; 
      request('https://api.singly.com/profiles?verify=true&access_token='+token, function (error, response, body) {
        
        var parsed_body = JSON.parse(body);
        console.log(parsed_body);
        res.render('results', {
          session: parsed_body
        });

      });
    }
  );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
