EmberStrap.Modal = Ember.View.extend
  layout: Ember.Handlebars.compile(
    '<div class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          {{yield}}
        </div>
      </div>
    </div>'
  )