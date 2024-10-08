/**
 * The `A11yAware` core class.
 *
 * @since 04-October-2024.
 */

const { BroadcastChannel } = window || globalThis;

export class A11yAware {
  constructor (cssSelector, rootElement = document) {
    this._channel = new BroadcastChannel('a11y_aware');

    this._cssSelector = cssSelector;
    this._rootElement = rootElement;
    this._proxiedElement = rootElement.querySelector(cssSelector);
  }

  get rootElement () { return this._rootElement; }

  get element () {
    this.assert(this._proxiedElement, this._t(`Element is not defined. Check the cssSelector: ${this._cssSelector}`));
    return this._proxiedElement;
  }

  getControlledElement () {
    this.assert(this.element.hasAttribute('aria-controls'), this._t('Expecting an `aria-controls` attribute on trigger button.'));
    const controlsId = this.element.getAttribute('aria-controls');
    this.assert(controlsId, this._t('The `aria-controls` attribute should point to a valid `id`.'));
    const controlledElem = this.rootElement.querySelector(`#${controlsId}`);
    this.assert(controlledElem, this._t('The `aria-controls` attribute should point to a valid `id` (2).'));
    return controlledElem;
  }

  toggleExpandedState () {
    this.assert(this.element.hasAttribute('aria-expanded'), this._t('Expecting an `aria-expanded` attribute on trigger button.'));
    const isExpanded = this.element.getAttribute('aria-expanded') === 'true';
    this.element.setAttribute('aria-expanded', !isExpanded);
  }

  toggleVisibility (targetElement) {
    this.assert(targetElement, this._t('toggleVisibility expects a `targetElement`'));
    this.assert(this.isShowableElement(targetElement), this._t('Expecting a `<dialog>`, or something with an appropriate `role` attribute.'));
    if (this.isDialog(targetElement)) {
      const isModal = targetElement.hasAttribute('aria-modal');
      const actionFunc = targetElement.hasAttribute('open') ? 'close' : isModal ? 'showModal' : 'show';
      this.assert(typeof targetElement[actionFunc] === 'function', this._t('The `actionFunc` should be a function.'));
      targetElement[actionFunc]();
    } else if (this.isHiddenAttr(targetElement)) {
      targetElement.removeAttribute('hidden');
    } else {
      targetElement.setAttribute('hidden', '');
    }
  }

  addToggleListener (listenerFunc, opt = {}) {
    const eventType = opt.eventType || 'click';
    this.assert(eventType && typeof eventType === 'string', 'eventType is a string.');

    this.element.addEventListener(eventType, (ev) => {
      ev.preventDefault();

      const controlledElement = this.getControlledElement();
      this.toggleVisibility(controlledElement);
      this.toggleExpandedState();

      if (listenerFunc && typeof listenerFunc === 'function') {
        listenerFunc(ev, controlledElement, opt);
      }
    });
  }

  isShowableElement (elem) {
    const role = elem.getAttribute('role');
    return /DIALOG/.test(elem.tagName) || (role && /listbox|dialog/.test(role));
  }

  isDialog (elem) {
    return elem.tagName === 'DIALOG';
  }

  isHiddenAttr (elem) {
    return elem.hasAttribute('hidden');
  }

  assert (assertion, msgFail, msgOK) {
    console.assert(!!assertion, msgFail, null);

    this._channel.postMessage({ assertion: !!assertion, msgFail, msgOK });
  }

  _t (message) { return message; }
}

export default A11yAware;
