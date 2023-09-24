# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "jam-flow"
  spec.version = "0.5.0"
  spec.authors = ["benjammin4dayz"]
  spec.email = ["42326027+benjammin4dayz@users.noreply.github.com"]

  spec.summary = "A simple and elegant SPA-inspired portfolio theme for Jekyll."
  spec.homepage = "https://benjammin4dayz.github.io/jekyll-themes/flow"
  spec.license = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = Dir.glob("{__dist/**/*,assets/**/*,_data/**/*,_includes/**/*,_layouts/**/*,_sass/**/*,LICENSE,README,_config.yml,lib/**/*,bin/**/*}")
  spec.require_path = "lib"
  spec.executables = ["flow"]

  spec.add_runtime_dependency "jekyll", "~> 4.3.2"
  spec.add_development_dependency "bundler", "~> 2.4.1"
end
