
# A11yAware

[![Pages Deploy][ci-badge]][ci]
[![NPM Version][npm-badge]][npm]

I'm the micro-library that rewards accessible, semantic HTML5 and [minimal][rule1], [well-formed][conform] [ARIA][]!

Given the HTML:

```html
<button
  id="triggerButton"
  aria-controls="myDialog"
  aria-expanded="false"> Click me! </button>

<dialog id="myDialog">
  <p> Hello, I’m a native dialog box! </p>
</dialog>
```

You can use the Javascript:

```js
import A11yAware from 'A11yAware';

const buttonProxy = new A11yAware('#triggerButton');

buttonProxy.addToggleListener();
```

… To show and hide the dialog box, while correctly updating the state of the ARIA attributes, for example, `aria-expanded`.

Neat, huh?

* Demo: [nfreear.github.io/a11y-aware/test][ghp]
* CDN: [unpkg.com/a11y-aware][up]

## Custom element

See the [custom element][] demo.

```html
<a11y-aware>
  <button … > … </button>
  <dialog … > … </dialog>
</a11y-aware>
```

## Guided mode

See the [guided][] demo.

```html
<a11y-aware guided="true">
  <button … > … </button>
  <dialog … > … </dialog>
</a11y-aware>
```

## Support

The library tests for and/or supports(*) the following HTML elements and attributes:

* [`<dialog>`][dlg-elem] element, and the `show()`, `showModal()` and `close()` methods on the `HTMLDialogElement` class,
* [`hidden`][hidden] global attribute,
* [`aria-controls`][aria-controls], [`aria-expanded`][aria-expanded] and [`aria-haspopup`][aria-haspopup] attributes,
* [`role="listbox"`][listbox], `role="dialog"` …

[up]: https://unpkg.com/a11y-aware
[ghp]: https://nfreear.github.io/a11y-aware/test/good.html
[custom element]: https://nfreear.github.io/a11y-aware/test/good.elem.html
[guided]: https://nfreear.github.io/a11y-aware/test/good.elem.html
[pen demo]: https://codepen.io/nfreear/pen/poMbKzj
[rule1]: https://www.w3.org/TR/using-aria/#rule1
  "First rule of ARIA - Don't use ARIA!"
[guide]: https://www.w3.org/TR/html-aria/#author-guidance-to-avoid-incorrect-use-of-aria
[conform]: https://www.w3.org/TR/html-aria/#docconformance
  "ARIA in HTML: Document conformance…"
[aria]: https://www.w3.org/TR/wai-aria-1.2/
  "Accessible Rich Internet Applications (WAI-ARIA) 1.2, W3C Recommendation, 06 June 2023"
[aria-controls]: https://w3.org/TR/wai-aria-1.2/#aria-controls
[aria-expanded]: https://w3.org/TR/wai-aria-1.2/#aria-expanded
[aria-haspopup]: https://w3.org/TR/wai-aria-1.2/#aria-haspopup
[listbox]: https://w3.org/TR/wai-aria-1.2/#listbox
[dlg-elem]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[hidden]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden
  "'hidden' global attribute, MDN"
[spec-hddn]: https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute
[pen orig]: https://codepen.io/nfreear/pen/VwoeGpx
[accname]: https://github.com/google/accessible-name
[dom-accessibility-api]: https://github.com/eps1lon/dom-accessibility-api

[ci]: https://github.com/nfreear/a11y-aware/actions/workflows/node.js.yml
[ci-badge]: https://github.com/nfreear/a11y-aware/actions/workflows/node.js.yml/badge.svg
[npm]: https://www.npmjs.com/package/a11y-aware
[npm-badge]: https://img.shields.io/npm/v/a11y-aware
