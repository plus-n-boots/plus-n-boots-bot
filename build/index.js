'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-core/polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _config = require('./config');

var bot = new _bot2['default'](_config.botUsername, _config.botPassword);
var server = (0, _express2['default'])();

server.use(_bodyParser2['default'].json());

server.all('/', function (req, res) {
  res.end();
  bot.onEvent(req.body);
});

server.listen(_config.port, function () {
  console.log('listening on port ' + _config.port);
});