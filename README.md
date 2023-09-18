# Flow

`Flow` is a simple and elegant SPA-inspired Jekyll theme for your client or portfolio. This mobile-friendly design features snap scrolling, lazy loading capability, and more.

## Installation

#### As a Ruby Gem

1.  Download the latest release of the [Flow Theme gem](https://github.com/benjammin4dayz/jekyll-themes/tags)

2.  Navigate to the directory where flow-v0.0.0.gem is located and install it.

        $ cd ./user/downloads
        $ gem install flow

    > Alternatively, you can use [specific_install](https://rubygems.org/gems/specific_install) to clone and install this branch as a gem

        $ gem install specific_install
        $ gem specific_install -l 'https://github.com/benjammin4dayz/jekyll-themes.git' -b 'flow-src'

3.  Get the project scaffold:

          $ flow dist

#### Git / Build it Yourself

1.  Clone my repo and switch to the proper branch (or download [a release](https://github.com/benjammin4dayz/jekyll-themes/tags))

        $ git clone https://github.com/benjammin4dayz/jekyll-themes.git
        $ git checkout flow-src

2.  Get the distributable files by invoking `dist.rb` on the CLI, or call Bundler directly

        $ bundle exec flow dist

## Usage

### Add Site Icon (Favicon)

1.  Generate and download your favicon using your preferred method
    - I suggest [favicon.ico](https://favicon.ico) by [John Sorrentino](https://twitter.com/johnsorrentino)
2.  Extract your favicon files in `assets/favicon/`

        - _articles/
        - _includes/
        - assets/
          - js/
          - favicon/
            - android-chrome-192x192.png
            - android-chrome-512x512.png
            - apple-touch-icon.png
            - favicon.ico
            - favicon-16x16.png
            - favicon-32x32.png
            - site.webmanifest

### Add Portrait:

Specify a URL or replace the [local portrait](./assets/portrait.jpg) found at `./assets/portrait.jpg`

```yaml
# _config.yml
client:
  portrait_url: https://example.com/my-photo # Leave blank to use local portrait
```

### Add Social Links

Under the `social` namespace, declare each `platform` with its name, and then specify your `handle`. Buttons appear in the order that platforms are listed here.

```yaml
# _config.yml
social:
  - platform: Facebook
    handle: JohnD
```

[Supported Platforms & Icons](./_data/social_icons.yml)

### Add New Articles

Create `n-article.html` in the `_articles` folder, where `n` is the order in which it should appear.

- Note: don't worry about `<!DOCTYPE>`, `<head>`, or `<body>` tags- they are handled for you.

  - To include something in the document head, use `_includes/head.html`

```html
---
title: Page One
anchor: page-one
---

<section id="example-article">
  <header>
    <h1>This is a page</h1>
  </header>
  <p>Copy me to create new scrollable pages</p>
</section>
```

### Basic Lazy Load

```js
const whenThisElementIsObserved = 'my-element-id';
const forThisAmountOfTime = 100; // ms
const thisHappensAsAResult = () => console.log('Hello, world!');

// Post 'Hello, world' to the console when 'my-element-id' is observed for 100ms
FlowTheme.Utils.lazyLoad(
  whenThisElementIsObserved,
  forThisAmountOfTime,
  thisHappensAsAResult
);
```

### Embed Helper

#### YouTube

```js
const YouTube = new FlowTheme.EmbedHelper.YouTube(
  'your-channel-id',
  'embed-target-id'
);
YouTube.fetchVideo().then((video) => {
  console.log(video.data);
  video.embed();
});
```

#### Twitch

Not implemented yet :(

## Contributing

Please share any bugs that you encounter on [GitHub](https://github.com/benjammin4dayz/jekyll-themes) or contact me on Discord @benjammin4dayz

This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Development

Clone the repo

    $ git clone https://github.com/benjammin4dayz/jekyll-themes.git
    $ git checkout flow-src

Get the distributables and navigate to the output directory

    $ .\dist
    $ cd ../jekyll-flow

Call `bundler exec jekyll serve` using the `serve.rb` alias

    $ .\serve

When the theme is built, only the files specified in ` spec.files` will be bundled.
To add a custom directory to the theme-gem, please edit the regexp in `flow.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
