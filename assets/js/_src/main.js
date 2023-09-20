import Info from './lib/info.js';
import StickyHeader from './lib/sticky-header.js';
import Utils from './lib/utils.js';
import EmbedHelper from './lib/embed-helper.js';

const { lazyLoad } = Utils;

export { EmbedHelper, lazyLoad as lazy };

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
