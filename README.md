# Flow

`Flow` is a simple and elegant SPA-inspired Jekyll theme for your client or portfolio. This mobile-friendly design features snap scrolling, lazy loading capability, and more.

## Installation

1. Download [theme scaffold](https://github.com/benjammin4dayz/jekyll-themes/releases?q=Flow)

2. Customize `_config.yml`

3. Upload to GitHub (or build locally)

4. Go to your repository settings tab and enable GitHub Pages via Actions

5. Go to your repository actions tab and trigger the workflow to generate your website

### As a Ruby Gem

#### Note: Replace references to `flow-v0.0.0` with the appropriate version

- Use Bundler

  - Create a Gemfile and paste this

    ```ruby
    source "https://rubygems.org"
    gem "jam-flow", tag: 'flow-v0.0.0', github: 'benjammin4dayz/jekyll-themes'
    ```

  - Then get the template

        $ bundle install
        $ bundle exec flow go

- Use [specific_install](https://rubygems.org/gems/specific_install) if you're too lazy to add a Gemfile

      $ gem install specific_install
      $ gem specific_install -l 'https://github.com/benjammin4dayz/jekyll-themes.git' -t 'flow-v0.0.0'

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

### Add Custom Pages

Create the HTML document in your project root with the following front matter:

- To include something in the document head, use `_includes/custom-head.html`

```yaml
---
title: My Custom Page
description: Hello, search engine robots!
layout: custom
---
```

**Note:** don't worry about `<!DOCTYPE>`, `<head>`, or `<body>` tags- they are handled for you.

### Basic Lazy Load

```js
const whenThisElementIsObserved = 'my-element-id';
const forThisAmountOfTime = 100; // ms
const thisHappensAsAResult = () => console.log('Hello, world!');

// Post 'Hello, world' to the console when 'my-element-id' is observed for 100ms
FlowTheme.lazy(
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
YouTube.fetchVideoData().then((data) => {
  const { mostRecentVideo, list } = data;
  mostRecentVideo.embed();
  list[i].embed();
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
    $ cd jam-flow

Modify the Gemfile to point `flow` to the gem development path instead of the repo

```ruby
gem "jam-flow", path: '../'
```

Call `bundler exec jekyll serve` using the `serve.rb` alias

    $ .\serve

When the theme is built, only the files specified in ` spec.files` will be bundled.
To add a custom directory to the theme-gem, please edit the regexp in `flow.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
