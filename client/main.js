Goodness = new Ground.Collection('goodness', {connection: null});
Counters = new Ground.Collection('counters', {connection: null});

if (Meteor.isCordova) {
  document.addEventListener('resume', function() {
    Meteor._reload.reload();
  }, false);
};

setHeader = function(header) {
  Session.set('headerData', header);
};
getHeader = function() {
  var blank = {title: 'Франклин', isBackVisible: false};
  return Session.get('headerData') ? Session.get('headerData') : blank;
};
getCurrentDay = function() {
  return moment().startOf("day").toDate();
};
franklinDate = function(date) {
  var calendar = moment(date).locale('ru').calendar();
  return calendar.split(" в ")[0];
};

initDbData = function() {
  var goodnessArray = ["Быть уверенным в себе", "Быть сдержанным", "Обходиться без сигарет", "Обходиться без мата в речи"];

  goodnessArray.forEach(function(item, i, goodnessArray) {
    var fileName = Math.floor(Math.random() * 10 + 1) + '.jpg';
    var currentGoodnessId = Goodness.insert({avatar: fileName, title: item, maxCount: 6, date: moment().subtract(6, 'day').startOf('day').toDate()});
    Counters.insert({date: moment().subtract(6, 'day').startOf('day').toDate(), goodnessId: currentGoodnessId, counter: 6});
    Counters.insert({date: moment().subtract(5, 'day').startOf('day').toDate(), goodnessId: currentGoodnessId, counter: 2});
    Counters.insert({date: moment().subtract(3, 'day').startOf('day').toDate(), goodnessId: currentGoodnessId, counter: 4});
    Counters.insert({date: moment().subtract(2, 'day').startOf('day').toDate(), goodnessId: currentGoodnessId, counter: 3});
  });
};
