Template.inputForm.onCreated(function() {
  setHeader({title: 'Создание..', isBackVisible: true})
});
Template.inputForm.events({
  'click .js-submit': function() {
    console.log('It works!');
  }
});
