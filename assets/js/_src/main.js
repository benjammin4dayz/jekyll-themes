import Info from './lib/info.js';
import StickyHeader from './lib/sticky-header.js';
// import TrueViewHeight from './lib/true-view-height.js';
import Utils from './lib/utils.js';
import EmbedHelper from './lib/embed-helper.js';

new Info();
new StickyHeader('sticky-header', [
  'article-navigation__bar--clean',
  'article-navigation__bar--sticky'
]);
// new TrueViewHeight(); //TODO: Improve or prune
Utils.updateActiveNavButtons(
  '.article-navigation__button',
  'article-navigation__button--current-anchor'
);

export {
  //   Info,
  //   StickyHeader,
  // //TrueViewHeight,
  Utils,
  EmbedHelper
};
