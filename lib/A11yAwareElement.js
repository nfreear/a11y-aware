/**
 * The `A11yAwareElement` custom element.
 *
 * @since 04-October-2024.
 */

import A11yAware from './A11yAware.js';

const guidedElementPath = './GuidedDialogElement.js';
const { HTMLElement, customElements } = window || globalThis;

// importGuidanceElement();

export class A11yAwareElement extends HTMLElement {
  get focusableSelector () {
    return 'button, input, a[href], [tabindex="0"]';
  }

  get isGuided () { return this.getAttribute('guided'); }

  get rootElement () { return this; }

  async connectedCallback () {
    // await this._importGuidanceElement();

    this._elementProxy = new A11yAware(this.focusableSelector, this.rootElement);

    await this._importSetupGuidanceElement();
    await this._sleep(100);

    this._elementProxy.addToggleListener((ev) => {
      console.debug('connectedCallback ~ toggle:', ev);
    });

    const controlledElement = this._elementProxy.getControlledElement();
    if (!controlledElement) {
      console.debug('connectedCallack ~ Return early!');
      return;
    }

    // Native <dialog> element.
    const closeButton = controlledElement.querySelector('[method = dialog] button');

    closeButton && closeButton.addEventListener('click', (ev) => {
      this._elementProxy.toggleExpandedState();
    });

    console.debug('A11yAwareElement:', this);
  }

  async _importSetupGuidanceElement () {
    if (this.isGuided) {
      const { GuidedDialogElement } = await import(guidedElementPath);
      this._guidanceElement = new GuidedDialogElement();
      document.body.appendChild(this._guidanceElement);

      this._guidanceElement.show();
    }
  }

  _sleep (delayMS = 500) {
    return new Promise((resolve) => setTimeout(() => resolve(), delayMS));
  }
}

/* async function importGuidanceElement () {
  if (document.querySelector('a11y-aware[ guided ]')) {
    await import('./GuidedDialogElement.js');
  }
} */

customElements.define('a11y-aware', A11yAwareElement);
