var FlowTheme=function(e){"use strict";class t{constructor(){this.overlay=this._createOverlay(),document.body.appendChild(this.overlay),this._injectHTML(this.overlay)}_createOverlay(){const e=document.createElement("div"),{style:t}=e;return t.position="fixed",t.top="0",t.left="0",t.right="0",t.bottom="0",t.zIndex="9999",t.display="flex",t.justifyContent="center",t.alignItems="center",t.minWidth="100vw",t.minHeight="100vh",e}_injectHTML(e){e.innerHTML=this._html}get _html(){return"<style>.container{backdrop-filter:blur(8px);overflow:auto;width:85%;max-width:800px;max-height:80%;margin:auto;padding:20px;background:#3333337a;border-radius:10px}.header{display:flex;padding:10px;background-color:#24292e;color:#fff}.header h1{flex:1;margin:0;font-size:24px}.content{margin-top:20px;padding:20px;border:1px solid #8e9092}.site-mail{width:50%;height:50%}.footer{padding:10px;background-color:#adaeaf;text-align:center}</style><div class=container><div class=header><h1>Site Information</h1><button onclick=this.parentNode.parentNode.parentNode.remove()><strong>X</strong></button></div><div class=content><h2>Privacy Policy</h2><p>This site does not store or process any user data but embedded content may. Please review the following documents if you have any concerns.<ul><li><a href=https://discord.com/privacy target=_blank>Discord</a><li><a href=https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement target=_blank>GitHub</a><li><a href=https://www.twitch.tv/p/en/legal/privacy-notice/ target=_blank>Twitch</a><li><a href=https://www.tiktok.com/legal/page/us/privacy-policy/en target=_blank>TikTok</a><li><a href=https://policies.google.com/privacy target=_blank>YouTube</a><li><a href=https://widgetbot.io/privacy target=_blank>WidgetBot</a></ul><iframe height=350 src=https://e.widgetbot.io/channels/1140249773132218418/1140249773593600072 width=100%></iframe></div><div class=footer><div>Made with ❤️ for Roman12663</div>© 2023 Benjammin4dayz. Some Rights Reserved.</div></div>"}}class i{constructor(e){this.headerId=e,this.init()}init(){this.origin=this.calculateInitialPosition(),this._onScroll(this.toggleSticky)}calculateInitialPosition(e=this.header){const t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}}toggleSticky(e=window.scrollY){e>this.offsetTop?this._makeSticky():this._makeNotSticky(),e<=this.origin.top&&this._makeNotSticky()}_makeSticky(){this.header.classList.contains("sticky")||(this._createPlaceholder(),this._addClass("sticky"))}_makeNotSticky(){this.header.classList.contains("sticky")&&(this._removePlaceholder(),this._removeClass("sticky"))}_createPlaceholder(){const e=document.createElement("div");e.style.height=`${this.header.offsetHeight}px`,this.header.parentNode.insertBefore(e,this.header),this.placeholder=e}_removePlaceholder(){this.placeholder&&(this.placeholder.parentNode.removeChild(this.placeholder),this.placeholder=null)}_onScroll(e){window.addEventListener("scroll",(()=>e.call(this)))}_addClass(e){this.header.classList.add(e)}_removeClass(e){this.header.classList.remove(e)}set headerId(e){if(e instanceof Element)return this._header=e;const t=document.getElementById(e);t?this._header=t:console.error(`[StickyHeader]: Missing element by ID ${e}`)}get header(){return this._header}get offsetTop(){return this.header.offsetTop}set origin(e){this._origin=e}get origin(){return this._origin}}class o{constructor(e){const{_say:t}=o;this._isMobileDevice?this._init():e?(t("Enabled"),this._init()):t("Disabled")}_init(){document.addEventListener("DOMContentLoaded",this._updateViewHeight),this._addResizeListener(this._updateViewHeight)}_updateViewHeight(){const e=`${window.innerHeight}px`;o._say(`Actual Viewport Height: ${e}`),document.documentElement.style.setProperty("--vh",e)}_addResizeListener(e){o._say("Waiting for window resize event..."),window.addEventListener("resize",this._debounce(e))}_debounce(e){const t=Math.max(133*Math.random(),66);let i;return()=>{clearTimeout(i),i=setTimeout(e,t)}}static _say(e=""){console.log(`[TrueViewHeight]: ${e}`)}get _isMobileDevice(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}}class a{static trackPageHash(e,t){const i=new IntersectionObserver((i=>{i.forEach((i=>{if(i.isIntersecting){const o=i.target.getAttribute("id");if(o){window.history.replaceState(null,null,`#${o}`);document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("data-target")===o&&e.classList.add(t)}))}}}))}),{threshold:.5});document.querySelectorAll(".page").forEach((e=>{i.observe(e)}))}static lazyLoad(e,t,i){if(!(e=document.getElementById(e)))return console.error("[LazyLoad]: Element not found");let o;new IntersectionObserver(((e,a)=>{e.forEach((e=>{if(e.isIntersecting){const r=e.target;o=setTimeout((()=>{if(!i)throw new Error("[LazyLoad]: Callback function not provided");try{i()}catch(e){throw new Error(`[LazyLoad]: Callback failed: ${e}`)}a.unobserve(r),console.log("[LazyLoad]: "+r.id)}),t)}else clearTimeout(o)}))})).observe(e),console.log(`[LazyLoad]: Waiting to load ${e.id}`)}static get _currentURL(){return window.location.origin.split("//")[1]}}return a.trackPageHash(".landing-nav a","active"),new i("landing-nav"),window.contact=()=>new t,e.Info=t,e.StickyHeader=i,e.TrueViewHeight=o,e.Utils=a,e}({});
