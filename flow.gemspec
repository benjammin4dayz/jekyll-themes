# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "flow"
  spec.version       = "0.1.0"
  spec.authors       = ["benjammin4dayz"]
  spec.email         = ["42326027+benjammin4dayz@users.noreply.github.com"]

  spec.summary       = "A simple and elegant SPA-inspired portfolio theme for Jekyll."
  spec.homepage      = "https://benjammin4dayz.github.io/jekyll-themes/flow" # TODO: Create a demo site using this theme
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(__template|assets|_data|_includes|_layouts|_sass|LICENSE|README|_config\.yml)!i) }
  spec.add_runtime_dependency "jekyll", "~> 4.3.2"

  spec.add_development_dependency "bundler"
  
end
