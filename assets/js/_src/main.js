import Info from './lib/info.js';
import StickyHeader from './lib/sticky-header.js';
import TrueViewHeight from './lib/true-view-height.js';
import Utils from './lib/utils.js';

// new Info('site-info');
// new TrueViewHeight(); //TODO: Evaluate if this is still needed
Utils.trackPageHash('.landing-nav a', 'active');
new StickyHeader('landing-nav');

window.contact = () => new Info();

export { Info, StickyHeader, TrueViewHeight, Utils };
