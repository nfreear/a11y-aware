
import '../../lib/element.js';
import A11yAware from '../../lib/index.js';

const buttonProxy = new A11yAware('#triggerButton');

buttonProxy.addToggleListener((ev) => {
  console.debug('app.js ~ toggle:', ev);
});
