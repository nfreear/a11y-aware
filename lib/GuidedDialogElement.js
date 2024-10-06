/**
 * The `GuidedDialogElement` custom element.
 *
 * @since 04-October-2024.
 */

import MyElement from 'https://unpkg.com/ndf-elements@1.6.0/src/MyElement.js';

const { customElements, BroadcastChannel } = window || globalThis;

const TEMPLATE = `
<template>
  <style>
    [ data-assert = false ] { color: darkred; }
  </style>
  <dialog>
    <h2> Guidance </h2>
    <ul id="log">
    </ul>
  </dialog>
</template>
`;

export class GuidedDialogElement extends MyElement {
  constructor () {
    super();
    this._channel = new BroadcastChannel('a11y_aware');

    this._messages = [];
  }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);

    this._dialogElement = this.shadowRoot.querySelector('dialog');
    this._listElement = this._dialogElement.querySelector('#log');
    console.assert(this._listElement, '_listElement');

    this._channel.onmessage = (ev) => this.addMessage(ev.data, ev);

    console.debug('GuidedDialogElement:', this);
  }

  show () {
    this._dialogElement.show();
  }

  addMessage (data, ev) {
    const { assertion, msgFail /*, msgOK */ } = data;
    if (!assertion) {
      const listItem = document.createElement('li');
      listItem.textContent = `⚠️ Warning: ${msgFail}`;
      listItem.dataset.assert = assertion;
      this._listElement.appendChild(listItem);
    }
    console.debug('onmessage:', assertion, msgFail, ev);
  }
}

customElements.define('a11y-guided-dialog', GuidedDialogElement);
