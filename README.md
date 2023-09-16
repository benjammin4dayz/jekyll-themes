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

Create `n-article.html` in the project root, where `n` is the order in which it should appear.

```yaml
# 0-hello.html
---
title: Hello World # As displayed on the nav button
anchor: hello-world
---
# ...
# HTML goes here.
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

Please share any bugs that you encounter on [GitHub](https://github.com/benjammin4dayz/jekyll-themes) or contact me on Discord `@benjammin4dayz`

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
