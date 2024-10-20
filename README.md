
# A11yAware

[![Pages Deploy][ci-badge]][ci]
[![NPM Version][npm-badge]][npm]

I'm the micro-library and custom element that rewards accessible, semantic HTML and [minimal][rule1], [well-formed][conform] [ARIA][]!

Given HTML containing a `<button>` and `<dialog>`:

```html
<button
  id="triggerButton"
  aria-controls="myDialog"
  aria-expanded="false"> Click me! </button>

<dialog id="myDialog">
  <p> Hello, I’m a native dialog box! </p>
</dialog>
```

You can use this Javascript:

```js
import A11yAware from 'A11yAware';

const buttonProxy = new A11yAware('#triggerButton');

buttonProxy.addToggleListener();
```

… To show and hide the dialog box, while correctly updating the state of the ARIA attributes, for example, `aria-expanded`.

Missing or incorrect ARIA is reported via [assertion][] errors in the browser console.

Neat, huh?

* Demo: [nfreear.github.io/a11y-aware/test][ghp]
* CDN: [unpkg.com/a11y-aware][unpkg]

## Custom element

The library exports the `<a11y-aware>` custom element – see the [demo][elem-demo].

```html
<a11y-aware>
  <button … > … </button>
  <dialog … > … </dialog>
</a11y-aware>
```

## Guided mode

Make accessibility issues more visible with the [guided][] mode:

```html
<a11y-aware guided="true">
  <button … > … </button>
  <dialog … > … </dialog>
</a11y-aware>
```

## Support

The library currently tests for and/or supports(*) the following HTML elements and attributes:

* [`<dialog>`][dlg-elem] element, and the `show()`, `showModal()` and `close()` methods on the `HTMLDialogElement` class,
* [`hidden`][hidden] global attribute,
* [`aria-controls`][aria-controls], [`aria-expanded`][aria-expanded] and [`aria-haspopup`][aria-haspopup] attributes,
* [`role="listbox"`][listbox], `role="dialog"` …

[unpkg]: https://unpkg.com/a11y-aware
[ghp]: https://nfreear.github.io/a11y-aware/test/good.html
[elem-demo]: https://nfreear.github.io/a11y-aware/test/good.elem.html
[guided]: https://nfreear.github.io/a11y-aware/test/guided.html
[pen demo]: https://codepen.io/nfreear/pen/poMbKzj
[rule1]: https://www.w3.org/TR/using-aria/#rule1
  "First rule of ARIA - Don't use ARIA!"
[guidance]: https://www.w3.org/TR/html-aria/#author-guidance-to-avoid-incorrect-use-of-aria
[conform]: https://www.w3.org/TR/html-aria/#docconformance
  "ARIA in HTML: Document conformance…"
[aria]: https://www.w3.org/TR/wai-aria-1.2/
  "Accessible Rich Internet Applications (WAI-ARIA) 1.2, W3C Recommendation, 06 June 2023"
[aria-controls]: https://w3.org/TR/wai-aria-1.2/#aria-controls
[aria-expanded]: https://w3.org/TR/wai-aria-1.2/#aria-expanded
[aria-haspopup]: https://w3.org/TR/wai-aria-1.2/#aria-haspopup
[listbox]: https://w3.org/TR/wai-aria-1.2/#listbox
[assertion]: https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static
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
