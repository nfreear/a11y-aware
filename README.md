
# A11yAware

I'm the micro-library that rewards semantic HTML5, with minimal, well-formed ARIA!

Given the HTML:

```html
<button
  id="triggerButton"
  aria-controls="dialogA"
  aria-expanded="false"> Click me! </button>

<dialog id="dialogA">
  <p> Hello, I'm a dialog box! </p>
</dialog>
```

You can use the Javascript:

```js
import A11yAware from 'A11yAware';

const buttonProxy = new A11yAware('#triggerButton');

buttonProxy.addToggleListener();
```

... To show the dialog box, while updating the state of the ARIA attributes, for example, `aria-expanded`.

Neat, huh?

[pen]: https://codepen.io/nfreear/pen/VwoeGpx
[dom-accessibility-api]: https://github.com/eps1lon/dom-accessibility-api
