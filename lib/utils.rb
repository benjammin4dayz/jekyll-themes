require "fileutils"

module Utils
  # https://stackoverflow.com/questions/3274640/how-do-i-copy-files-from-a-gem-to-the-local-directory
  @dist_dir = File.expand_path(File.join(File.dirname(__FILE__), "..", "__dist"))

  class << self
    attr_reader :dist_dir
  end

  def self.make_scaffold(dest_dir)
    Dir.mkdir(dest_dir) unless Dir.exist?(dest_dir)

    # Recursively copy files from self.dist_dir to dest_dir, excluding _config.yml and Gemfile
    Dir.glob("#{self.dist_dir}/**/*", File::FNM_DOTMATCH).each do |file|
      next if File.basename(file) == "." || File.basename(file) == ".." || File.basename(file) == "_config.yml" || File.basename(file) == "Gemfile"

      destination_file = File.join(dest_dir, file.sub("#{self.dist_dir}/", ""))
      if File.directory?(file)
        FileUtils.mkdir_p(destination_file)
      else
        FileUtils.mkdir_p(File.dirname(destination_file))
        FileUtils.cp(file, destination_file)
      end
    end

    # Copy _config.yml only if it does not exist in the destination directory
    config_file = File.join(dest_dir, "_config.yml")
    unless File.exist?(config_file)
      FileUtils.mkdir_p(File.dirname(config_file))
      FileUtils.cp(File.join(self.dist_dir, "_config.yml"), config_file)
      puts "Created _config.yml"
    end

    # Copy Gemfile only if it does not exist in the destination directory
    gemfile = File.join(dest_dir, "Gemfile")
    unless File.exist?(gemfile)
      FileUtils.mkdir_p(File.dirname(gemfile))
      FileUtils.cp(File.join(self.dist_dir, "Gemfile"), gemfile)
      puts "Created Gemfile"
    end

    puts "Files copied successfully."
  end
end
