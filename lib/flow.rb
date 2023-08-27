require "fileutils"

module Flow
  # https://stephenagrice.medium.com/making-a-command-line-ruby-gem-write-build-and-push-aec24c6c49eb
  def self.hello
    ["Flow | A Jekyll Theme by Benjammin4dayz",
     "Generating your template..."]
      .join("\nFlow |")
  end

  # https://stackoverflow.com/questions/3274640/how-do-i-copy-files-from-a-gem-to-the-local-directory
  def self.copy_template
    template_dir = File.expand_path(File.join(File.dirname(__FILE__), "..", "__dist"))
    build_dir = File.join(Dir.pwd, "jekyll-flow")

    FileUtils.mkdir_p(build_dir)

    Dir.glob(File.join(template_dir, "**", "*")).each do |file|
      relative_path = file.sub(template_dir + "/", "")
      destination = File.join(build_dir, relative_path)

      if File.directory?(file)
        FileUtils.mkdir_p(destination)
      else
        FileUtils.cp(file, destination)
      end
    end
  end
end
