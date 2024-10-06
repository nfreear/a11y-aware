/**
 * The `A11yAwareElement` custom element.
 *
 * @since 04-October-2024.
 */

import A11yAware from './index.js';

const guidedElementPath = './GuidedDialogElement.js';
const { HTMLElement, customElements } = window || globalThis;

// importGuidanceElement();

class A11yAwareElement extends HTMLElement {
  get focusableSelector () {
    return 'button, input, a[href], [tabindex="0"]';
  }

  get isGuided () { return this.getAttribute('guided'); }

  get rootElement () { return this; }

  async connectedCallback () {
    // await this._importGuidanceElement();

    this._elementProxy = new A11yAware(this.focusableSelector, this.rootElement);

    await this._importGuidanceElement();
    this._setupGuidanceElement();

    await this.sleep(100);

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

    console.debug('connectedCallback');
  }

  async _importGuidanceElement () {
    if (this.isGuided) {
      const { GuidedDialogElement } = await import(guidedElementPath);
      // this._GuidedDialogElement = GuidedDialogElement;
      this._guidanceElement = new GuidedDialogElement();
    }
  }

  _setupGuidanceElement () {
    if (this.isGuided) {
      // this._guidanceElement = document.createElement('a11y-guided-dialog');
      document.body.appendChild(this._guidanceElement);

      /* this.sleep(500).then(() => {
        this._elementProxy.setMessageCallback(this._guidanceElement.addMessage);
        this._guidanceElement.show();
      }); */

      this._guidanceElement.show();
    }
  }

  sleep (delayMS = 500) {
    return new Promise((resolve) => setTimeout(() => resolve(), delayMS));
  }
}

/* async function importGuidanceElement () {
  if (document.querySelector('a11y-aware[ guided ]')) {
    await import('./GuidedDialogElement.js');
  }
} */

customElements.define('a11y-aware', A11yAwareElement);
