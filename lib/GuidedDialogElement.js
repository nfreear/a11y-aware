/**
 * The `<a11y-guided-dialog>` custom element.
 *
 * @class GuidedDialogElement
 * @listens a11y_aware#assert
 *
 * @since 04-October-2024.
 */

import MyElement from 'https://unpkg.com/ndf-elements@1.6.0/src/MyElement.js';

const { customElements, BroadcastChannel } = window || globalThis;

const TEMPLATE = `
<template>
  <style>
    dialog { background: #fafafa; bottom: 2px; padding: .5rem; }
    summary { padding: .5rem; }
    .X_h2 { display: inline-block; float: left; margin-top: 0; }
    .X[ method = dialog ] button { float: right; }
    ul { clear: both; max-height: 6rem; overflow-y: scroll; }
    [ data-assert = false ] { color: darkred; }
    * { border-radius: .2rem; }
  </style>
  <dialog part="dialog">
    <details open>
      <summary>A11y Guidance</summary>
      <!-- <form method="dialog">
        <button part="button" aria-label="Close">&times;</button>
      </form> -->
      <h2> Accessibility Guidance </h2>
      <ul id="log">
      </ul>
    </details>
  </dialog>
</template>
`;

export class GuidedDialogElement extends MyElement {
  constructor () {
    super();
    this._channel = new BroadcastChannel('a11y_aware');

    this._messages = [];
  }

  setIdx (idx) {
    this._idx = idx;
    this.dataset.idx = idx;
  }

  getIdx () { return this._idx; }

  connectedCallback () {
    this._attachLocalTemplate(TEMPLATE);

    this._dialogElement = this.shadowRoot.querySelector('dialog');
    this._listElement = this._dialogElement.querySelector('#log');
    console.assert(this._listElement, '_listElement');

    this._channel.onmessage = (ev) => this.addMessage(ev.data, ev);

    console.debug('GuidedDialogElement:', this.getIdx(), this);
  }

  show () {
    this._dialogElement.show();
  }

  addMessage (data, ev) {
    const { assertion, idx, msgFail /*, msgOK */ } = data;
    if (!assertion && idx === this.getIdx()) {
      const listItem = document.createElement('li');
      listItem.textContent = `⚠️ Warning: ${msgFail}`;
      listItem.dataset.assert = assertion;
      this._listElement.appendChild(listItem);
    }
    console.debug('onmessage:', idx, assertion, msgFail, ev);
  }
}

customElements.define('a11y-guided-dialog', GuidedDialogElement);
