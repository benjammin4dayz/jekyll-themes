/**
 * @benjammin4dayz on Discord & GitHub
 */
class Site {
  static init() {
    // Site.info('site-info');
    // Site.trueViewHeight(); //TODO: Evaluate if this is still needed
    Site.trackPageHash('.landing-nav a', 'active');
    Site.stickyHeader('landing-nav');
  }

  static info(buttonId) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => new Site._util.Info());
  }

  static trueViewHeight() {
    new Site._util.TrueViewHeight();
  }

  static trackPageHash(navButtonQuery, elementActiveClass) {
    // Update page hash to reflect the active article as the user scrolls
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const id = target.getAttribute('id');
            if (id) {
              // Use replaceState to update the URL without triggering refresh or navigation
              // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
              window.history.replaceState(null, null, `#${id}`);

              // Highlight the navigational buttons for the current article
              const navButtons = document.querySelectorAll(navButtonQuery);
              navButtons.forEach((el) => {
                el.classList.remove(elementActiveClass);
                if (el.getAttribute('data-target') === id)
                  el.classList.add(elementActiveClass);
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const pages = document.querySelectorAll('.page');

    pages.forEach((page) => {
      observer.observe(page);
    });
  }

  static stickyHeader(elementId) {
    return new Site._util.StickyHeader(elementId);
  }

  /**
   * Lazy load when a given element has been visible for a specified amount of time
   *
   * @param {string} element - The ID of the element that will trigger the event when observed
   * @param {number} delay - The delay (in milliseconds) that the element must be observed before causing the event
   * @param {function} callback - Callback function to execute when the element was observed
   */
  static lazyLoad(element, delay, callback) {
    element = document.getElementById(element);
    if (!element) return console.error('[LazyLoad]: Element not found');
    let timeoutId;

    // Use IntersectionObserver API to trigger an event when the element becomes visible
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Set a timeout to load the element after the specified delay
          timeoutId = setTimeout(() => {
            if (callback) {
              try {
                callback();
              } catch (e) {
                throw new Error(`[LazyLoad]: Callback failed: ${e}`);
              }
            } else {
              throw new Error(`[LazyLoad]: Callback function not provided`);
            }

            // Stop observing the element and log a message
            observer.unobserve(target);
            console.log('[LazyLoad]: ' + target.id);
          }, delay);
        } else {
          // Cancel the timeout if the element leaves the viewport
          clearTimeout(timeoutId);
        }
      });
    });

    // Start observing the element and log a message
    observer.observe(element);
    console.log(`[LazyLoad]: Waiting to load ${element.id}`);
  }

  static get _currentURL() {
    // https://example.com -> example.com
    return window.location.origin.split('//')[1];
  }
  static get _util() {
    class Info {
      constructor() {
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

    class TrueViewHeight {
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

    class StickyHeader {
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

      toggleSticky(pos = window.scrollY) {
        pos > this.offsetTop ? this._makeSticky() : this._makeNotSticky();
        if (pos <= this.origin.top) this._makeNotSticky();
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

      set origin(pos) {
        this._origin = pos;
      }

      get origin() {
        return this._origin;
      }
    }

    return {
      Info,
      TrueViewHeight,
      StickyHeader
    };
  }
}
