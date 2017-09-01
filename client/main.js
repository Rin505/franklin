Goodness = new Ground.Collection('goodness', {connection: null});
Counters = new Ground.Collection('counters', {connection: null});

setHeader = function(header) {
  Session.set('headerData', header);
};
getHeader = function() {
  var blank = {title: 'Франклин', isBackVisible: false};
  return Session.get('headerData') ? Session.get('headerData') : blank;
}
