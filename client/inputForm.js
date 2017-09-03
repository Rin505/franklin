Template.inputForm.onCreated(function() {
  this.picture = new ReactiveVar('');
  setHeader({title: 'Создание..', isBackVisible: true})
});
Template.inputForm.helpers({
  getPicture: function() {
    return Template.instance().picture.get();
  },
  needShowImage: function() {
    return !!Template.instance().picture.get();
  }
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
    var templateInstance = Template.instance();
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
        if (!error) {
          templateInstance.picture.set(data);
        }
      }
    );
  },
  'click .js-remove-photo': function() {
    if (!confirm('Вы уверены, что хотите удалить?')) {
      return;
    }
    Template.instance().picture.set('');
  }
});
