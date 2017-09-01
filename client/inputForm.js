Template.inputForm.onCreated(function() {
  setHeader({title: 'Создание..', isBackVisible: true})
});
Template.inputForm.events({
  'click .js-submit': function() {
    var text = $('.js-text').val()
    if (text.length > 0) {
      Goodness.insert({title: text, date: new Date, maxCount: 0});
      Router.go('goodnessList');
    }
  }
});
