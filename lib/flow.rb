require_relative "utils"

module Flow
  # https://stephenagrice.medium.com/making-a-command-line-ruby-gem-write-build-and-push-aec24c6c49eb
  def self.hello
    ["Flow " + "v" + Gem.loaded_specs["jam-flow"].version.to_s + " | A Jekyll Theme by Benjammin4dayz",
     "https://github.com/benjammin4dayz/jekyll-themes/releases?q=Flow"].join("\n")
  end

  def self.scaffold(dest_dir)
    puts "Outputting files to #{dest_dir}"
    Utils.make_scaffold(dest_dir)
  end
end
