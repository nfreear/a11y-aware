
# A11yAware

I'm the micro-library that rewards semantic HTML5 and [minimal][rule1], [well-formed][conform] ARIA!

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

… To show the dialog box, while updating the state of the ARIA attributes, for example, `aria-expanded`.

Neat, huh?

[rule1]: https://www.w3.org/TR/using-aria/#rule1
  "First rule of ARIA - Don't use ARIA!"
[guide]: https://www.w3.org/TR/html-aria/#author-guidance-to-avoid-incorrect-use-of-aria
[conform]: https://www.w3.org/TR/html-aria/#docconformance
  "ARIA in HTML: Document conformance…"
[aria 1.2]: https://www.w3.org/TR/wai-aria-1.2/
[pen]: https://codepen.io/nfreear/pen/VwoeGpx
[accname]: https://github.com/google/accessible-name
[dom-accessibility-api]: https://github.com/eps1lon/dom-accessibility-api
