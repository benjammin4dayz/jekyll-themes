# Flow

`Flow` is a simple and elegant SPA-inspired Jekyll theme for your client or portfolio. This mobile-friendly design features snap scrolling, lazy loading capability, and more.

## Installation

#### Gem-based

Download and install the [specific_install](https://rubygems.org/gems/specific_install) gem:

    $ gem install specific_install

Download my theme gem via GitHub:

    $ gem specific_install -l 'https://github.com/benjammin4dayz/jekyll-themes.git' -b 'flow-src'

Get the project scaffold:

    $ flow init

#### Manual

Clone my repo and switch to the proper branch

    $ git clone https://github.com/benjammin4dayz/jekyll-themes.git
    $ git checkout flow-src

Get the distributable files by invoking `dist.rb` on the CLI

    $ .\dist

Or use Bundler directly

    $ bundle exec flow init

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
hash: hello-world
---
# ...
# HTML goes here.
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/benjammin4dayz/jekyll-themes. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `flow.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
