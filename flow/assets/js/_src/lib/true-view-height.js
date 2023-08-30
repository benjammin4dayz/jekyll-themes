export default class TrueViewHeight {
  constructor(override) {
    const { _say } = TrueViewHeight;
    this._isMobileDevice
      ? this._init()
      : override
      ? (_say('Enabled'), this._init())
      : _say('Disabled');
  }

  _init() {
    // Set a variable `--vh` which represents the actual height of the viewport
    document.addEventListener('DOMContentLoaded', this._updateViewHeight);
    // Update `--vh` after the window is resized
    this._addResizeListener(this._updateViewHeight);
  }

  _updateViewHeight() {
    const vh = `${window.innerHeight}px`;
    TrueViewHeight._say(`Actual Viewport Height: ${vh}`);
    document.documentElement.style.setProperty('--vh', vh);
  }

  _addResizeListener(handler) {
    TrueViewHeight._say('Waiting for window resize event...');
    window.addEventListener('resize', this._debounce(handler));
  }

  _debounce(handler) {
    const delay = Math.max(Math.random() * 133, 66);
    let isBeingResized;

    return () => {
      clearTimeout(isBeingResized);
      isBeingResized = setTimeout(handler, delay);
    };
  }

  static _say(msg = '') {
    console.log(`[TrueViewHeight]: ${msg}`);
  }

  get _isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}
