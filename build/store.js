'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setData = setData;
exports.getData = getData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cradle = require('cradle');

var _cradle2 = _interopRequireDefault(_cradle);

var _config = require('./config');

var couch = new _cradle2['default'].Connection(_config.couchInstance, _config.couchPort);
var db = couch.database('issues');

/**
 * add intial data when issue is opened
 */

function setData(repoName, issueId, issueData, action) {
  db[action]('issue:' + repoName + '_' + issueId, issueData, function (err, res) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * get data for specific document
 */

function getData(repoName, issueId) {
  return regeneratorRuntime.async(function getData$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return new Promise(function (resolve, reject) {
          return db.get('issue:' + repoName + '_' + issueId, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              resolve(doc);
            }
          });
        });

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}