import Ember from 'ember';

export default Ember.Component.extend({
  intl: Ember.inject.service(),

  classNames: ['input-group'],
  classNameBindings: ['hasErrorClass:error'],

  hasErrorClass: Ember.computed.and('hasErrors', 'showErrors'),

  showErrors: Ember.computed.alias('form.showErrors'),

  setup: Ember.on('init', function() {
    this.setForm();
    this.setData();
    this.setHasErrors();
    this.setModelType();
    this.setInputId();
    this.setType();
    this.setLabel();
    this.setValue();
  }),

  didInsertElement() {
    this._super(...arguments);

    if (this.get('autofocus')) {
      this.$('input').focus();
    }
  },

  setForm() {
    if (this.get('form')) { return; }

    this.set('form', this.get('parentView'));
  },

  setData() {
    if (this.get('data')) { return; }

    this.set('data', this.get('form.data'));
  },

  setHasErrors() {
    this.hasErrors = Ember.computed.notEmpty(`data.displayErrors.${this.get('field')}`);
  },

  setModelType() {
    if (this.get('modelType')) { return; }

    this.set('modelType', this.get('data.content.constructor.modelName'));
  },

  setLabel() {
    if (this.get('label')) { return; }

    const modelType = this.get('modelType');
    const field = this.get('field');
    const translationKey = `models.attributes.${modelType.underscore()}.${field.underscore()}`;

    const label = this.get('intl').t(translationKey);
    this.set('label', Ember.String.capitalize(label));
  },

  setInputId() {
    if (this.get('inputId')) { return ; }

    const elementId = this.get('elementId');
    const modelType = this.get('modelType');
    const fieldName = this.get('field');
    this.set('inputId', `${elementId}-${modelType}-${fieldName}`);
  },

  setType() {
    if (this.get('type')) {
      if (this.get('type') === 'textarea') { this.set('textarea', true); }
      return;
    }

    switch (this.get('field')) {
      case 'email':
        this.set('type', 'email');
        break;
      case 'password':
        this.set('type', 'password');
        break;
      case 'passwordConfirmation':
        this.set('type', 'password');
        break;
      default:
        this.set('type', 'text');
    }
  },

  setValue() {
    this.value = Ember.computed.alias(`data.${this.get('field')}`);
  }
});
