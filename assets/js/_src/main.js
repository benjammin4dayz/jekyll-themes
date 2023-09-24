const Info = require('./lib/info.js');
const StickyHeader = require('./lib/sticky-header.js');
const Utils = require('./lib/utils.js');
const EmbedHelper = require('./lib/embed-helper.js');

const { lazyLoad } = Utils;

module.exports = {
  EmbedHelper,
  lazy: lazyLoad
};

try {
  new Info();
  new StickyHeader('sticky-header', [
    'article-navigation__bar--clean',
    'article-navigation__bar--sticky'
  ]);
  Utils.updateActiveNavButtons(
    '.article-navigation__button',
    'article-navigation__button--current-anchor'
  );
  Utils.check.isMobileDevice ||
    ((document.documentElement.style.scrollSnapType = 'y mandatory'),
    (document.documentElement.style.scrollBehavior = 'smooth'));
} catch {}
