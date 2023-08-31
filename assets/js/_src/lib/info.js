export default class Info {
  constructor() {
    this.source = '6a92351396da31b26e2d97f204f3d1a0';
    this.init();
  }

  init() {
    this._makeOverlay();
    this._styleOverlay();
    this._openOnKeypress('`');
  }

  spawnOverlay() {
    fetch(this.source)
      .then((response) => response.json())
      .then((data) => {
        this.html = data.files['overlay.html'].content;
      })
      .then(() => {
        this.overlay.innerHTML = this.html;
        document.body.appendChild(this.overlay);
      })
      .catch((e) => console.error(`[Info-Overlay]: ${e}`));
  }

  _makeOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'bnj0--overlay-main';
    this.overlay = overlay;
  }
  _styleOverlay() {
    const { style } = this.overlay;
    style.display = 'flex';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.position = 'fixed';
    style.zIndex = '9999';
    style.top = '0';
    style.bottom = '0';
    style.left = '0';
    style.right = '0';
    style.minWidth = '100vw';
    style.minHeight = '100vh';
  }

  _openOnKeypress(key) {
    document.addEventListener(
      'keydown',
      (event) => event.key === key && this.spawnOverlay().bind(this)
    );
  }

  set source(id) {
    this._source = `https://api.github.com/gists/${id}`;
  }
  get source() {
    return this._source;
  }

  set html(html) {
    const minify = (src) => src.replace(/<!--(.*?)-->|\s\B/gm, '');
    this._html = `\`${minify(html)}\``;
  }
  get html() {
    return this._html;
  }

  set overlay(el) {
    this._overlay = el;
  }
  get overlay() {
    return this._overlay;
  }
}
