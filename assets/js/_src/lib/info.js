export default class Info {
  constructor() {
    this.source = '6a92351396da31b26e2d97f204f3d1a0';
    this.init();
  }

  init() {
    this.assignHotkey('`', this.spawnOverlay.bind(this));
  }

  assignHotkey(key, callback) {
    document.addEventListener(
      'keydown',
      (event) => event.key === key && callback()
    );
  }

  spawnOverlay() {
    this._fetchHTML()
      .then(() => {
        this.overlay = this._makeOverlay();
        document.body.appendChild(this.overlay);
        this._injectHTML(this.overlay);
      })
      .catch((e) => console.error(e));
  }

  _makeOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'bnj0--overlay-main';
    const { style } = overlay;
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.right = '0';
    style.bottom = '0';
    style.zIndex = '9999';
    style.display = 'flex';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.minWidth = '100vw';
    style.minHeight = '100vh';
    return overlay;
  }

  _injectHTML(target) {
    target.innerHTML = this.html;
  }

  _minify(source) {
    // regex is black magic - ty regex101 for the tasty copy pasta
    return source.replace(/<!--(.*?)-->|\s\B/gm, '');
  }

  _fetchHTML() {
    return new Promise((resolve, reject) => {
      fetch(this.source)
        .then((response) => response.json())
        .then((data) => {
          this.html = data.files['overlay.html'].content;
          resolve();
        })
        .catch((e) => reject(e));
    });
  }

  set html(html) {
    this._html = `\`${this._minify(html)}\``;
  }
  get html() {
    return this._html;
  }

  set source(s) {
    this._source = `https://api.github.com/gists/${s}`;
  }
  get source() {
    return this._source;
  }
}
