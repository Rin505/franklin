Template.goodnessList.helpers({
  'goodnessList': function() {
    return Goodness.find({}, {sort: {date:-1}});
  }
});
Template.goodnessList.onCreated(function() {
  setHeader(null)
});
