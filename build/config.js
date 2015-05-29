'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var argv = _yargs2['default'].argv;

var botUsername = argv.username || null;
exports.botUsername = botUsername;
var botPassword = argv.password || null;
exports.botPassword = botPassword;
var port = argv.port || null;
exports.port = port;
var couchInstance = argv.couch || null;
exports.couchInstance = couchInstance;
var couchPort = argv['couch-port'] || null;
exports.couchPort = couchPort;