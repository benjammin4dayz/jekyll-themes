import Info from './lib/info.js';
import StickyHeader from './lib/sticky-header.js';
// import TrueViewHeight from './lib/true-view-height.js';
import Utils from './lib/utils.js';
import EmbedHelper from './lib/embed-helper.js';

new Info();
new StickyHeader('landing-nav');
// new TrueViewHeight(); //TODO: Improve or prune
Utils.trackPageHash('.landing-nav a', 'active');

export {
  //   Info,
  //   StickyHeader,
  // //TrueViewHeight,
  Utils,
  EmbedHelper
};
