class StickyHeader {
  constructor(elementId, modifiers) {
    this.headerId = elementId;
    this.modifiers = modifiers;
    this.init();
  }

  init() {
    this.origin = this._calculateInitialPosition();
    this._onScroll(this.toggleSticky);
  }

  toggleSticky(scrollY = window.scrollY) {
    scrollY > this.offsetTop ? this._makeSticky() : this._makeClean();
    if (scrollY <= this.origin.top) this._makeClean();
  }

  _calculateInitialPosition(el = this.header) {
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    return { top, left };
  }

  get isSticky() {
    return this.header.classList.contains(this.modifiers.sticky) ? true : false;
  }

  _makeSticky() {
    if (!this.isSticky) {
      this._removeClass(this.modifiers.clean);
      this._placeholder(true);
      this._addClass(this.modifiers.sticky);
    }
  }

  _makeClean() {
    if (this.isSticky) {
      this._removeClass(this.modifiers.sticky);
      this._placeholder(false);
      this._addClass(this.modifiers.clean);
    }
  }

  _placeholder(bool) {
    if (bool) {
      const placeholder = document.createElement('div');
      placeholder.style.height = `${this.header.offsetHeight}px`;
      this.header.parentNode.insertBefore(placeholder, this.header);
      this.placeholder = placeholder;
    } else if (!bool) {
      if (this.placeholder) {
        this.placeholder.parentNode.removeChild(this.placeholder);
        this.placeholder = null;
      }
    }
  }

  _onScroll(callback) {
    window.addEventListener('scroll', () => callback.call(this));
  }

  _addClass(className) {
    this.header.classList.add(className);
  }

  _removeClass(className) {
    this.header.classList.remove(className);
  }

  set headerId(id) {
    if (id instanceof Element) return (this._header = id);
    const element = document.getElementById(id);
    element
      ? (this._header = element)
      : console.error(`[StickyHeader]: Missing element by ID ${id}`);
  }

  get header() {
    return this._header;
  }

  get offsetTop() {
    return this.header.offsetTop;
  }

  set origin(xy) {
    this._origin = xy;
  }

  get origin() {
    return this._origin;
  }

  set modifiers(mod) {
    if (!Array.isArray(mod)) {
      throw TypeError(
        '[Sticky-Header]: Constructor opt [modifiers] must be an array of classnames where arr[0] is initial state and arr[1] is sticky'
      );
    }
    this._modifiers = {
      clean: mod[0],
      sticky: mod[1]
    };
  }

  get modifiers() {
    return this._modifiers;
  }
}

module.exports = StickyHeader;
