Template.header.helpers({
  title: function() {
    return getHeader().title;
  },
  isBackVisible: function() {
    return getHeader().isBackVisible;
  },
  isTrashVisible: function() {
    return getHeader().isTrashVisible;
  }
});
Template.header.events({
  'click .js-remove': function() {
    if (!confirm('Вы уверены, что хотите удалить?')) {
      return;
    }
    Counters.remove({goodnessId: Router.current().params._id}, function() {
      Goodness.remove(Router.current().params._id, function() {
        Router.go('goodnessList');
      });
    });
  }
});
