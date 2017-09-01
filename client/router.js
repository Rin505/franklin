Router.configure({
  layoutTemplate: 'franklinTemplate'
});

Router.map(function() {
  this.route('/', {name: 'goodnessList'});
  this.route('/create', {name: 'inputForm'});
  this.route('/detail/:_id', {name: 'goodnessDetail'});
});
