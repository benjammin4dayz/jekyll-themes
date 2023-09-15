var FlowTheme=function(e){"use strict";class t{static updateActiveNavButtons(e,t){const i=new IntersectionObserver((i=>{i.forEach((i=>{if(i.isIntersecting){const r=i.target.getAttribute("id");if(r){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("data-target")===r&&e.classList.add(t)}))}}}))}),{threshold:.5});document.querySelectorAll(".page").forEach((e=>{i.observe(e)}))}static lazyLoad(e,t,i){if(!(e=document.getElementById(e)))return console.error("[LazyLoad]: Element not found");let r;new IntersectionObserver(((e,s)=>{e.forEach((e=>{if(e.isIntersecting){const n=e.target;r=setTimeout((()=>{if(!i)throw new Error("[LazyLoad]: Callback function not provided");try{i()}catch(e){throw new Error(`[LazyLoad]: Callback failed: ${e}`)}s.unobserve(n),console.log("[LazyLoad]: "+n.id)}),t)}else clearTimeout(r)}))})).observe(e),console.log(`[LazyLoad]: Waiting to load ${e.id}`)}static get check(){return{currentURL:window.location.origin.split("//")[1],isMobileDevice:t._testForMobile()}}static _testForMobile(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}}class i{constructor(e,t){this.channelId=e,this.embedTarget=t}async fetchVideo(){return fetch(encodeURI("https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id="+this.channelId)).then((e=>e.json())).then((e=>this.data=e)).then((()=>({data:this.video,embed:this._embedLastVideo.bind(this)}))).catch((e=>this._throwError("noFetch")))}get video(){const{title:e,pubDate:t,link:i,author:r,thumbnail:s,description:n}=this.data.items[0];return{title:e,pubDate:t,link:i,author:r,thumbnail:s,description:n}}set channelId(e){(!e.length||"string"!=typeof e)&&this._throwError("badChannelId"),this._channelId=e}get channelId(){return this._channelId}set embedTarget(e){"string"==typeof e&&e.length?this._embedTarget=document.getElementById(e):e instanceof Element?this._embedTarget=e:console.warn("[YouTube-Embed]: Invalid embedTarget")}get embedTarget(){return this._embedTarget}set data(e){"object"!=typeof e&&this._throwError("invalidChannelData"),this._data=e}get data(){return this._data}_embedLastVideo(){const e=this.video.link,t=e.substr(e.indexOf("=")+1);this.embedTarget.src=`https://youtube.com/embed/${t}/?controls=0&showinfo=0&rel=0`}_throwError(e){if(e instanceof Error)throw e;throw"badChannelId"===e&&(e="Constructor argument `channelId` must be a non-empty string"),"badEmbedTarget"===e&&(e="Constructor argument `embedId` must be an Element or a non-empty string"),"noFetch"===e&&(e="An error occurred while fetching channel data"),"invalidChannelData"===e&&(e="Channel Data must be an object"),new Error(`[YouTube-Embed]: ${e}`)}}class r{constructor(){throw new ReferenceError("Not implemented yet!")}}return new class{constructor(){this.source="6a92351396da31b26e2d97f204f3d1a0",this.init()}init(){this._makeOverlay(),this._styleOverlay(),this._openOnKeypress("`")}spawnOverlay(){fetch(this.source).then((e=>e.json())).then((e=>{this.html=e.files["overlay.html"].content})).then((()=>{this.overlay.innerHTML=this.html,document.body.appendChild(this.overlay)})).catch((e=>console.error(`[Info-Overlay]: ${e}`)))}_makeOverlay(){const e=document.createElement("div");e.id="bnj0--overlay-main",this.overlay=e}_styleOverlay(){const{style:e}=this.overlay;e.display="flex",e.justifyContent="center",e.alignItems="center",e.position="fixed",e.zIndex="9999",e.top="0",e.bottom="0",e.left="0",e.right="0",e.minWidth="100vw",e.minHeight="100vh"}_openOnKeypress(e){document.addEventListener("keydown",(t=>t.key===e&&this.spawnOverlay()))}set source(e){this._source=`https://api.github.com/gists/${e}`}get source(){return this._source}set html(e){var t;this._html=`\`${t=e,t.replace(/<!--(.*?)-->|\s\B/gm,"")}\``}get html(){return this._html}set overlay(e){this._overlay=e}get overlay(){return this._overlay}},new class{constructor(e){this.headerId=e,this.init()}init(){this.origin=this.calculateInitialPosition(),this._onScroll(this.toggleSticky)}calculateInitialPosition(e=this.header){const t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}}toggleSticky(e=window.scrollY){e>this.offsetTop?this._makeSticky():this._makeNotSticky(),e<=this.origin.top&&this._makeNotSticky()}_makeSticky(){this.header.classList.contains("sticky")||(this._createPlaceholder(),this._addClass("sticky"))}_makeNotSticky(){this.header.classList.contains("sticky")&&(this._removePlaceholder(),this._removeClass("sticky"))}_createPlaceholder(){const e=document.createElement("div");e.style.height=`${this.header.offsetHeight}px`,this.header.parentNode.insertBefore(e,this.header),this.placeholder=e}_removePlaceholder(){this.placeholder&&(this.placeholder.parentNode.removeChild(this.placeholder),this.placeholder=null)}_onScroll(e){window.addEventListener("scroll",(()=>e.call(this)))}_addClass(e){this.header.classList.add(e)}_removeClass(e){this.header.classList.remove(e)}set headerId(e){if(e instanceof Element)return this._header=e;const t=document.getElementById(e);t?this._header=t:console.error(`[StickyHeader]: Missing element by ID ${e}`)}get header(){return this._header}get offsetTop(){return this.header.offsetTop}set origin(e){this._origin=e}get origin(){return this._origin}}("landing-nav"),t.updateActiveNavButtons(".landing-nav a","active"),e.EmbedHelper=class{static get YouTube(){return i}static get Twitch(){return r}},e.Utils=t,e}({});
