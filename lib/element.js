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

  get rootElement () { return this; }

  connectedCallback () {
    this._elementProxy = new A11yAware(this.focusableSelector, this.rootElement);

    this._elementProxy.addToggleListener((ev) => {
      console.debug('connectedCallback ~ toggle:', ev);
    });

    const controlledElement = this._elementProxy.getControlledElement();
    if (!controlledElement) {
      console.debug('connectedCallack ~ Return early!');
      return;
    }

    const closeButton = controlledElement.querySelector('[method = dialog] button');

    closeButton && closeButton.addEventListener('click', (ev) => {
      this._elementProxy.toggleExpandedState();
    });

    console.debug('connectedCallback');
  }
}

customElements.define('a11y-aware', A11yAwareElement);
