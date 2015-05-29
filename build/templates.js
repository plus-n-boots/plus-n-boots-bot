'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.initialTemplate = initialTemplate;
exports.updateTemplate = updateTemplate;
var intro = '###### plus-n-boots here, I\'ll be helping keep track of +1\'s for this issue.\n\n###### To add your support just leave a comment saying +1 or :+1: and I\'ll handle the rest.\n\n----------\n\n';

var outro = '\n----------\n\n###### Want my help in your organisation or repository? Check out my [getting started guide]() for details.\n\n###### Did I do something wrong? Something I could do better? Head over to my [repository]() to tell me about it.\n\n';
/**
 * the initial template to render
 */

function initialTemplate() {
  var body = '### No +1\'s for this issue just yet.';
  var comment = intro + body + outro;
  return comment;
}

/**
 * the updated template to render each time a new +1 is received
 */

function updateTemplate(count, users) {
  var peoplePlural = count === 1 ? 'person has' : 'people have';
  var listPlural = count === 1 ? 'That\'s you' : 'They are';
  var body = '### ' + count + ' ' + peoplePlural + ' +1\'d this issue.\n\n###### ' + listPlural + ' ' + users;
  var comment = intro + body + outro;
  return comment;
}