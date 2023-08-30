export default class StickyHeader {
  constructor(elementId) {
    this.headerId = elementId;
    this.init();
  }

  init() {
    this.origin = this.calculateInitialPosition();
    this._onScroll(this.toggleSticky);
  }

  calculateInitialPosition(el = this.header) {
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    return { top, left };
  }

  toggleSticky(scrollY = window.scrollY) {
    scrollY > this.offsetTop ? this._makeSticky() : this._makeNotSticky();
    if (scrollY <= this.origin.top) this._makeNotSticky();
  }

  _makeSticky() {
    if (!this.header.classList.contains('sticky')) {
      this._createPlaceholder();
      this._addClass('sticky');
    }
  }

  _makeNotSticky() {
    if (this.header.classList.contains('sticky')) {
      this._removePlaceholder();
      this._removeClass('sticky');
    }
  }

  _createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.style.height = `${this.header.offsetHeight}px`;
    this.header.parentNode.insertBefore(placeholder, this.header);
    this.placeholder = placeholder;
  }

  _removePlaceholder() {
    if (this.placeholder) {
      this.placeholder.parentNode.removeChild(this.placeholder);
      this.placeholder = null;
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
}
