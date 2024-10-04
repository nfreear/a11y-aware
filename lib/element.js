/**
 * The `A11yAwareElement` custom element.
 *
 * @since 04-October-2024.
 */

import A11yAware from './index.js';

const { HTMLElement, customElements } = window || globalThis;

class A11yAwareElement extends HTMLElement {
  get focusableSelector () {
    return 'button, input, a[href], [tabindex="0"]';
  }

  connectedCallback () {
    // this._clickableElement = this.getClickableElement();
    this._elementProxy = new A11yAware(this.focusableSelector);

    this._elementProxy.addToggleListener((ev) => {
      console.debug('toggle - connectedCallback:', ev);
    });

    const controlledElement = this._elementProxy.getControlledElement();
    if (!controlledElement) {
      console.debug('Return early!');
      return;
    }
    const closeButton = controlledElement.querySelector('button');

    closeButton.addEventListener('click', (ev) => {
      this._elementProxy.toggleExpandedState();
    });
  }

  _getClickableElement_OLD () {
    const clickableElement = document.querySelector(this.clickableSelector);
    console.assert(clickableElement());
    return clickableElement;
  }
}

customElements.define('a11y-aware', A11yAwareElement);
