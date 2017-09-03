Template.goodnessDetail.helpers({
  getCounters: function() {
    var values = [];
    var currentGoodness = Goodness.findOne(Router.current().params._id);
    var maxCount = currentGoodness.maxCount;

    var daysDifference = moment().diff(moment(currentGoodness.date), 'day');

    for (var i = 0; i <= daysDifference; i++) {
      var currentDate = moment(currentGoodness.date).add(i, 'day').startOf('day').toDate();
      var counterDocument = Counters.findOne({goodnessId: Router.current().params._id, date: currentDate});
      if (counterDocument) {
        values.unshift({counter: counterDocument.counter, value: (100 - (counterDocument.counter / maxCount) * 100), date: franklinDate(currentDate)});
      } else {
        values.unshift({counter: 0, value: 100, date: franklinDate(currentDate)});
      }
    };
    return values;
  }
});
Template.goodnessDetail.onCreated(function() {
  setHeader({title: 'Статистика', isBackVisible: true, isTrashVisible: true})
});
