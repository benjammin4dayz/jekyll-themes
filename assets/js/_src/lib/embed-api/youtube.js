// https://stackoverflow.com/questions/18267426/html-auto-embedding-recent-uploaded-videos-from-a-youtube-channel
export default class YouTube {
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
   *   data: {
   *     title: string;
   *     pubDate: string;
   *     link: string;
   *     author: string;
   *     thumbnail: string;
   *     description: string;
   *   };
   *   embed: () => void;
   * }>} A promise that resolves to an object containing the latest video data and an embed method.
   *
   * @example
   * YouTube.fetchVideo().then((video) => {
   *  console.log(video.data);
   *  video.embed();
   * })
   */
  async fetchVideo() {
    return fetch(
      encodeURI(
        'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=' +
          this.channelId
      )
    )
      .then((response) => response.json())
      .then((data) => (this.data = data))
      .then(() => {
        return {
          data: this.video,
          embed: this._embedLastVideo.bind(this)
        };
      })
      .catch((e) => this._throwError('noFetch'));
  }

  /**
   * Destructured data object representative of the latest video.
   */
  get video() {
    const { title, pubDate, link, author, thumbnail, description } =
      this.data.items[0];
    return {
      title,
      pubDate,
      link,
      author,
      thumbnail,
      description
    };
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
  _embedLastVideo() {
    const link = this.video.link;
    const id = link.substr(link.indexOf('=') + 1);
    this.embedTarget.src = `https://youtube.com/embed/${id}/?controls=0&showinfo=0&rel=0`;
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
    throw new Error(`[YouTube-Embed]: ${err}`);
  }
}
