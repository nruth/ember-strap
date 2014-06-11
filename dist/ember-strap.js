/**
 * ember-strap
 * @version v0.0.1 - 2014-06-11
 * @link https://github.com/pierrickrouxel/ember-strap
 * @author Pierrick Rouxel (pierrick.rouxel@me.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function() {
  window.EmberStrap = Ember.Namespace.create();

}).call(this);

(function() {
  EmberStrap.ScrollTo = Ember.Component.extend({
    layout: Ember.Handlebars.compile('{{yield}}'),
    tagName: 'a',
    attributeBindings: ['href'],
    click: function(event) {
      event.preventDefault();
      return this.scrollTo(this.$().attr('href'));
    },
    scrollTo: function(id) {
      return $('*[data-spy="scroll"]').scrollTop($(id).offset().top);
    }
  });

}).call(this);

(function() {
  Ember.Application.initializer({
    name: "ember-strap",
    initialize: function(container, application) {
      container.register('view:modal', EmberStrap.Modal);
      return container.register('component:scroll-to', EmberStrap.ScrollTo);
    }
  });

}).call(this);

(function() {
  EmberStrap.Modal = Ember.View.extend({
    layout: Ember.Handlebars.compile('<div {{bind-attr class=":modal-dialog view.sizeClass"}}> <div class="modal-content"> {{yield}} </div> </div>'),
    classNames: ['modal'],
    classNameBindings: ['animation:fade'],
    animation: true,
    size: '',
    sizeClass: (function() {
      if (this.get('size') === 'small') {
        return 'modal-sm';
      } else if (this.get('size') === 'large') {
        return 'modal-lg';
      }
    }).property('size'),
    didInsertElement: function() {
      return this.$().on('hidden.bs.modal', $.proxy(this.destroyElement, this)).modal('show');
    },
    willDestroyElement: function() {
      return this.$().off('hidden.bs.modal').modal('hide');
    }
  });

  Ember.Route.reopen({
    renderModal: function(name, options) {
      var modalView;
      options || (options = {});
      modalView = this.container.lookup('view:modal');
      modalView.setProperties(options);
      options.view = 'modal';
      return this.render(name, options);
    }
  });

}).call(this);