Template.goodnessList.helpers({
  'goodnessList': function() {
    return Goodness.find({});
  }
});
Template.goodnessList.onCreated(function() {
  setHeader(null)
});
