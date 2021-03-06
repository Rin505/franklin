Template.goodnessDetail.helpers({
  getTitle: function() {
    var currentGoodness = Goodness.findOne(Router.current().params._id);
    if (currentGoodness) {
      return currentGoodness.title;
    } else {
      return "Не известно";
    }
  },
  getCounters: function() {
    var values = [];
    var currentGoodness = Goodness.findOne(Router.current().params._id);
    if (!currentGoodness) {
      return values;
    }
    var maxCount = currentGoodness.maxCount;
    var daysDifference = moment().diff(moment(currentGoodness.date), 'day');
    for (var i = 0; i <= daysDifference; i++) {
      var currentDate = moment(currentGoodness.date).add(i, 'day').startOf('day').toDate();
      var counterDocument = Counters.findOne({goodnessId: Router.current().params._id, date: currentDate});
      if (counterDocument) {
        values.unshift({counter: counterDocument.counter, value: (counterDocument.counter / maxCount) * 100, date: franklinDate(currentDate)});
      } else {
        values.unshift({counter: 0, value: 0, date: franklinDate(currentDate)});
      }
    };
    return values;
  }
});
Template.goodnessDetail.onCreated(function() {
  setHeader({title: 'Статистика', isBackVisible: true, isTrashVisible: true})
});
