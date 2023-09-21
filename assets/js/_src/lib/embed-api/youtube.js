// https://stackoverflow.com/questions/18267426/html-auto-embedding-recent-uploaded-videos-from-a-youtube-channel
class YouTube {
  /**
   *
   * @param {String} channelId - YouTube Channel ID e.g. `UCUZHFZ9jIKrLroW8LcyJEQQ`
   * @param {String|Element} embedId - The ID or iFrame element to embed the video
   *
   */
  constructor(channelId, embedId) {
    this.channelId = channelId;
    this.embedTarget = embedId;
  }

  /**
   * @returns {Promise<{
   *   video: {
   *     mostRecent: {
   *      title: string;
   *      pubDate: string;
   *      link: string;
   *      author: string;
   *      thumbnail: string;
   *      description: string;
   *      embed: () => void;
   *     },
   *     list: [{
   *      title: string;
   *      pubDate: string;
   *      link: string;
   *      author: string;
   *      thumbnail: string;
   *      description: string;
   *      embed: () => void;
   *     }]
   *    }
   * }>} An object containing video data with an embed method
   *
   * @example
   * const YouTube = new YouTube(yourChannelId, targetEmbedId);
   * YouTube.fetchVideoData().then((data) => {
   * // Embed the most recent video
   * data.video.mostRecent.embed();
   * // Embed a specific video
   * data.video.list[i].embed();
   * })
   */
  async fetchVideoData() {
    const isCached = this.cache;

    return isCached
      ? this.cache
      : fetch(
          encodeURI(
            'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=' +
              this.channelId
          )
        )
          .then((response) => response.json())
          .then((data) => {
            this.data = data;
            this.videos = data.items;
          })
          .then(() => {
            // this._cacheVideoData(); // embed() method isnt saved to cache which leads to inconsistent behavior
            return this.videos;
          })
          .catch((e) => this._throwError('noFetch'));
  }

  set videos(data) {
    this._videos = data.map((item) => {
      const { title, pubDate, link, author, thumbnail, description } = item;
      return {
        title,
        pubDate,
        link,
        author,
        thumbnail,
        description,
        embed: () => this._embedVideo(item)
      };
    });
  }

  get videos() {
    return {
      mostRecent: this._videos[0],
      list: this._videos
    };
  }

  get cache() {
    let cache;
    try {
      cache = JSON.parse(sessionStorage.getItem(this.channelId));
    } catch {}
    return cache;
  }

  // Constructor
  set channelId(id) {
    (!id.length || typeof id !== 'string') && this._throwError('badChannelId');
    this._channelId = id;
  }
  get channelId() {
    return this._channelId;
  }
  set embedTarget(id) {
    typeof id === 'string' && id.length
      ? (this._embedTarget = document.getElementById(id))
      : id instanceof Element
      ? (this._embedTarget = id)
      : console.warn('[YouTube-Embed]: Invalid embedTarget');
  }
  get embedTarget() {
    return this._embedTarget;
  }
  // Response
  set data(obj) {
    typeof obj !== 'object' && this._throwError('invalidChannelData');
    this._data = obj;
  }
  get data() {
    return this._data;
  }
  // Private
  _embedVideo(data = this.videos.mostRecent) {
    const { link } = data;
    const id = link.substr(link.indexOf('=') + 1);
    this.embedTarget.src = `https://youtube.com/embed/${id}/?controls=0&showinfo=0&rel=0`;
  }
  _cacheVideoData() {
    try {
      sessionStorage.setItem(this.channelId, JSON.stringify(this.videos));
    } catch {
      console.error('noCache');
    }
  }
  _throwError(err) {
    if (err instanceof Error) throw err;
    err === 'badChannelId' &&
      (err = `Constructor argument \`channelId\` must be a non-empty string`);
    err === 'badEmbedTarget' &&
      (err = `Constructor argument \`embedId\` must be an Element or a non-empty string`);
    err === 'noFetch' &&
      (err = `An error occurred while fetching channel data`);
    err === 'invalidChannelData' && (err = `Channel Data must be an object`);
    err === 'noCache' && (err = `An error occurred while caching video data`);
    throw new Error(`[YouTube-Embed]: ${err}`);
  }
}

module.exports = YouTube;
