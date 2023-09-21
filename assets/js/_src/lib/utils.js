class Utils {
  static updateActiveNavButtons(navButtonQuery, elementActiveClass) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const id = target.getAttribute('id');
            if (id) {
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

  static get check() {
    return {
      currentURL: window.location.origin.split('//')[1],
      isMobileDevice: Utils._testForMobile()
    };
  }
  static _testForMobile() {
    return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      navigator.userAgent
    );
  }
}

module.exports = Utils;
