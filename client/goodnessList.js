Template.goodnessList.helpers({
  goodnessList: function() {
    return Goodness.find({}, {sort: {date:-1}});
  },
  getProgress: function(id) {
    var maxCount = Goodness.findOne(id).maxCount;
    var currentDay = getCurrentDay();
    var counterDocument = Counters.findOne({goodnessId: id, date: currentDay});
    if (counterDocument) {
      return 100 - (counterDocument.counter / maxCount) * 100;
    } else {
      return 100;
    }
  }
});
Template.goodnessList.onCreated(function() {
  setHeader(null)
});

Template.goodnessList.events({
  'click .js-count-increment': function() {
    var currentDay = getCurrentDay();
    var counterDocument = Counters.findOne({goodnessId: this._id, date: currentDay});
    var maxCount = 0;
    if (counterDocument) {
      maxCount = counterDocument.counter;
      Counters.update(counterDocument._id, {$inc: {counter: 1}});
    } else {
      Counters.insert({date: currentDay, goodnessId: this._id, counter: 1});
    }
    maxCount++;
    if (this.maxCount < maxCount) {
      Goodness.update(this._id, {$set: {maxCount: maxCount}});
    }
  }
});
