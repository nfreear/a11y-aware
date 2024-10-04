/**
 * The `A11yAware` core class.
 *
 * @since 04-October-2024.
 */

export class A11yAware {
  constructor (cssSelector, rootElement = document) {
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
    return this.rootElement.querySelector(`#${controlsId}`);
  }

  toggleExpandedState () {
    this.assert(this.element.hasAttribute('aria-expanded'), this._t('Expecting an `aria-expanded` attribute on trigger button.'));
    const isExpanded = this.element.getAttribute('aria-expanded') === 'true';
    this.element.setAttribute('aria-expanded', !isExpanded);
  }

  toggleVisibility (targetElement) {
    this.assert(targetElement, this._t('toggleVisibility expects a `targetElement`'));
    this.assert(targetElement && targetElement.tagName === 'DIALOG', this._t('Expecting a `<dialog>` element.'));
    const actionFunc = targetElement.hasAttribute('open') ? 'close' : 'show';
    // console.debug(typeof targetElement[actionFunc])
    this.assert(typeof targetElement[actionFunc] === 'function', this._t('The `actionFunc` should be a function.'));
    targetElement[actionFunc]();
  }

  addToggleListener (listenerFunc, opt = {}) {
    const eventType = opt.eventType || 'click';
    this.assert(eventType && typeof eventType === 'string');

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

  assert (assertion, msgFail, msgOK) {
    console.assert(assertion, msgFail, null);
  }

  _t (message) { return message; }
}

export default A11yAware;
