Template.goodnessList.helpers({
  goodnessList: function() {
    return Goodness.find({}, {sort: {date:-1}});
  },
  goodnessListCount: function() {
    return Goodness.find({}, {sort: {date:-1}}).count();
  },
  getProgress: function(id) {
    var maxCount = Goodness.findOne(id).maxCount;
    var currentDay = getCurrentDay();
    var counterDocument = Counters.findOne({goodnessId: id, date: currentDay});
    if (counterDocument) {
      return (counterDocument.counter / maxCount) * 100;
    } else {
      return 0;
    }
  },
  getToday: function(id) {
    var maxCount = Goodness.findOne(id).maxCount;
    var currentDay = getCurrentDay();
    var counterDocument = Counters.findOne({goodnessId: id, date: currentDay});
    if (counterDocument) {
      return counterDocument.counter;
    } else {
      return 0;
    }
  },
  getMax: function(id) {
    var maxCount = Goodness.findOne(id).maxCount;
    return maxCount;
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
