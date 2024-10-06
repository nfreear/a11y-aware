
import 'my-codepen-button';
import '../../lib/element.js';
import A11yAware from '../../lib/index.js';

if (/element/.test(import.meta.url)) {
  console.debug('app.js ~ element mode');
} else {
  const buttonProxy = new A11yAware('#triggerButton');

  buttonProxy.addToggleListener((ev) => {
    console.debug('app.js ~ toggle:', ev);
  });
}
