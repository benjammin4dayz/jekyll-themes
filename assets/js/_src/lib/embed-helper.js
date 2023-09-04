import YouTube from './embed-api/youtube.js';
import Twitch from './embed-api/twitch.js';

export default class EmbedHelper {
  static get YouTube() {
    return YouTube;
  }
  static get Twitch() {
    return Twitch;
  }
}
