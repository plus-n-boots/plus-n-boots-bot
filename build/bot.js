'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

var _templates = require('./templates');

var _store = require('./store');

var _default = (function () {
  var _class = function _default(username, password) {
    _classCallCheck(this, _class);

    this.username = username;
    this.password = password;
  };

  _createClass(_class, [{
    key: 'onEvent',

    /**
     * when an event is received
     */
    value: function onEvent(event) {
      return regeneratorRuntime.async(function onEvent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(event.issue && event.action === 'opened')) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return this.commentIssue(event);

          case 3:
            if (!(event.comment && this.isPlusOne(event.comment.body))) {
              context$2$0.next = 6;
              break;
            }

            context$2$0.next = 6;
            return this.amendComment(event);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'isPlusOne',

    /**
     * if the comment received is a +1
     */
    value: function isPlusOne(comment) {
      switch (comment.trim()) {
        case '+1':
        case ':+1:':
        case ':thumbsup:':
          return true;
      }
      return false;
    }
  }, {
    key: 'request',

    /**
     * handle sending requests back to github
     */
    value: function request(method, url, body) {
      return regeneratorRuntime.async(function request$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return new Promise(function (resolve, reject) {
              return (0, _request3['default'])({
                auth: {
                  username: _this.username,
                  password: _this.password
                },
                headers: {
                  'User-Agent': _this.username
                },
                method: method,
                url: 'https://api.github.com/' + url,
                json: true,
                body: body
              }, function (err, res, body) {
                if (err) {
                  reject(err);
                } else {
                  resolve(body);
                }
              });
            });

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'commentIssue',

    /**
     * create the initial comment to be used
     */
    value: function commentIssue(event) {
      var comment, issue;
      return regeneratorRuntime.async(function commentIssue$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return this.request('POST', 'repos/' + event.repository.full_name + '/issues/' + event.issue.number + '/comments', {
              body: (0, _templates.initialTemplate)()
            });

          case 2:
            comment = context$2$0.sent;
            issue = {
              initialComment: comment.id,
              count: 0,
              users: []
            };

            (0, _store.setData)(event.repository.full_name, event.issue.number, issue, 'save');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteComment',

    /**
     * delete the +1 comment
     */
    value: function deleteComment(event) {
      return regeneratorRuntime.async(function deleteComment$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return this.request('DELETE', 'repos/' + event.repository.full_name + '/issues/comments/' + event.comment.id);

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'amendComment',

    /**
     * update the initial comment with the new +1'er
     */
    value: function amendComment(event) {
      var issue, linkedUsers, usersStr;
      return regeneratorRuntime.async(function amendComment$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return this.deleteComment(event);

          case 2:
            context$2$0.next = 4;
            return (0, _store.getData)(event.repository.full_name, event.issue.number);

          case 4:
            issue = context$2$0.sent;

            if (!(issue.users.indexOf(event.comment.user.login) === -1)) {
              context$2$0.next = 13;
              break;
            }

            issue.users.push(event.comment.user.login);
            issue.count++;
            linkedUsers = issue.users.map(function (user) {
              return '@' + user;
            });
            usersStr = linkedUsers.join(', ');
            context$2$0.next = 12;
            return this.request('PATCH', 'repos/' + event.repository.full_name + '/issues/comments/' + issue.initialComment, {
              body: (0, _templates.updateTemplate)(issue.count, usersStr)
            });

          case 12:
            updateData(event.repository.full_name, event.issue.number, issue, 'merge');

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];