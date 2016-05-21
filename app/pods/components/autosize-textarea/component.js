import Ember from 'ember';
import autosize from 'npm:autosize';

const { TextArea } = Ember;

export default TextArea.extend({
  didInsertElement() {
    this._super(...arguments);

    autosize(this.get('element'));
  }
});
