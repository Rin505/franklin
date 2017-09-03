Template.inputForm.onCreated(function() {
  setHeader({title: 'Создание..', isBackVisible: true})
});
Template.inputForm.events({
  'click .js-submit': function() {
    var text = $('.js-text').val()
    if (text.length > 0) {
      var fileName = Math.floor(Math.random() * 10 + 1) + '.jpg';
      Goodness.insert({title: text, date: new Date, maxCount: 0, avatar: fileName});
      Router.go('goodnessList');
    }
  },
  'click .js-take-photo': function() {
    MeteorCameraUI.getPicture(
      {
        width: 512,
        height: 512,
        quality: 100,
        cancel: 'Отмена',
        takeImage: 'Сделать фото',
        imageLibrary: 'Загрузить из галереи'
      },
      function(error, data) {

      }
    );
    console.log('TAKE');
  },
  'click .js-remove-photo': function() {
    console.log('REMOVE');
  }
});
