Template.goodnessDetail.helpers({
  getCounters: function() {
    var values = [];
    var maxCount = Goodness.findOne(Router.current().params._id).maxCount;
    Counters.find({goodnessId: Router.current().params._id}).map(function(item) {
      var counterDocument = item;
      if (counterDocument) {
        values.push(100 - (counterDocument.counter / maxCount) * 100);
      } else {
        values.push(100);
      }
    });
    return values;
  }
});
Template.goodnessDetail.onCreated(function() {
  setHeader({title: 'Статистика', isBackVisible: true})
});
