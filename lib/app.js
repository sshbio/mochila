var express = require('express')
    , path = require('path')
    , logger = require('morgan')
    // , bodyParser = require('body-parser')
    , app = express();

app.set('port',process.env.SERVER_PORT || 9000);
app.set('domain',process.env.SERVER_BIND_IP ||"0.0.0.0");
app.use(logger('dev'));
app.use('/public/', express.static(path.join(__dirname, '../public')));
// parsing all requests may cause attack
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
if (app.get('env') === 'development') {
	var cors = require('cors');
	app.use(cors());
}
app.disable('etag');
module.exports = app;