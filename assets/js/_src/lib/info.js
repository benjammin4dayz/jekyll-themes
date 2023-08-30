export default class Info {
  constructor() {
    this.init();
  }

  init() {
    this.assignHotkey('.', this._openOverlay.bind(this));
  }

  assignHotkey(key, callback) {
    document.addEventListener(
      'keydown',
      (event) => event.key === key && callback()
    );
  }

  _openOverlay() {
    this.overlay = this._createOverlay();
    document.body.appendChild(this.overlay);
    this._injectHTML(this.overlay);
  }

  _createOverlay() {
    const overlay = document.createElement('div');
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
    target.innerHTML = this._html;
  }

  get _html() {
    return `<style>.container{backdrop-filter:blur(8px);overflow:auto;width:85%;max-width:800px;max-height:80%;margin:auto;padding:20px;background:#3333337a;border-radius:10px}.header{display:flex;padding:10px;background-color:#24292e;color:#fff}.header h1{flex:1;margin:0;font-size:24px}.content{margin-top:20px;padding:20px;border:1px solid #8e9092}.site-mail{width:50%;height:50%}.footer{padding:10px;background-color:#adaeaf;text-align:center}</style><div class=container><div class=header><h1>Site Information</h1><button onclick=this.parentNode.parentNode.parentNode.remove()><strong>X</strong></button></div><div class=content><h2>Privacy Policy</h2><p>This site does not store or process any user data but embedded content may. Please review the following documents if you have any concerns.<ul><li><a href=https://discord.com/privacy target=_blank>Discord</a><li><a href=https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement target=_blank>GitHub</a><li><a href=https://www.twitch.tv/p/en/legal/privacy-notice/ target=_blank>Twitch</a><li><a href=https://www.tiktok.com/legal/page/us/privacy-policy/en target=_blank>TikTok</a><li><a href=https://policies.google.com/privacy target=_blank>YouTube</a><li><a href=https://widgetbot.io/privacy target=_blank>WidgetBot</a></ul><iframe height=350 src=https://e.widgetbot.io/channels/1140249773132218418/1140249773593600072 width=100%></iframe></div><div class=footer><div>Made with ❤️ for Roman12663</div>© 2023 Benjammin4dayz. Some Rights Reserved.</div></div>`;
  }
}
