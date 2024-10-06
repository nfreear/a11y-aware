/**
 * The `GuidedDialogElement` custom element.
 *
 * @since 04-October-2024.
 */

import MyElement from 'https://unpkg.com/ndf-elements@1.6.0/src/MyElement.js';

const { customElements, BroadcastChannel } = window || globalThis;

const TEMPLATE = `
<template>
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
    console.assert(this._listElement);

    this._channel.onmessage = (event) => {
      console.debug('onmessage:', event);
      this.addMessage(event.data);
    };

    /* setTimeout(() => {
      // console.assert(this._)
      this._messages.forEach((it) => this.addMessage(it));
    },
    1000); */

    console.debug('Hello:', this);
  }

  show () {
    this._dialogElement.show();
  }

  addMessage (data) {
    const { assertion, msgFail /*, msgOK */ } = data;
    if (!assertion) {
      // if (this._listElement) {
      const listItem = document.createElement('li');
      listItem.textContent = msgFail;
      listItem.dataset.assertOk = !!assertion;
      this._listElement.appendChild(listItem);
      /* } else {
        this._messages.push(data);
      } */
    }
    console.debug('addMessage:', assertion, msgFail);
  }
}

customElements.define('a11y-guided-dialog', GuidedDialogElement);
