var chalk = require('chalk');
var redList = [];
var yellowList = [];
var greenList = [];

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// line is a string, returns colored string
function colorKeywords(line, lists) {
  if (!line) return line;

  function withDefault(list, def) {
    return list && list.length ? list : def;
  }

  // Default keyword lists (case-insensitive)
  redList    = withDefault(lists.redList, ['error']);
  yellowList = withDefault(lists.yellowList, ['warning']);
  greenList  = withDefault(lists.greenList, ['success']);
  // greenList  = lists.greenList;

  var colored = line;

  redList.forEach(function(word) {
    var re = new RegExp(escapeRegExp(word), 'gi');
    colored = colored.replace(re, function(match) {
    //   return chalk.red(match);      // Text color
      return chalk.white.bgRed(match); // Background
    });
  });

  yellowList.forEach(function(word) {
    var re = new RegExp(escapeRegExp(word), 'gi');
    colored = colored.replace(re, function(match) {
    //   return chalk.yellow(match);      // Text color
      return chalk.black.bgYellow(match); // Background
    });
  });

  greenList.forEach(function(word) {
    var re = new RegExp(escapeRegExp(word), 'gi');
    colored = colored.replace(re, function(match) {
    //   return chalk.green(match);    // Text color
    return chalk.black.bgGreen(match); // Background
    });
  });

  return colored;
}

module.exports = {
  colorKeywords,
  redList,
  yellowList,
  greenList
};
