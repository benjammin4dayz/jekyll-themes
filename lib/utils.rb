require "fileutils"

module Utils
  # https://stackoverflow.com/questions/3274640/how-do-i-copy-files-from-a-gem-to-the-local-directory
  @dist_dir = File.expand_path(File.join(File.dirname(__FILE__), "..", "__dist"))
  @dest_dir = File.join(Dir.pwd, "jekyll-flow")
  @dest_dir_dev = File.join(Dir.pwd, "../jekyll-flow")

  class << self
    attr_reader :dist_dir, :dest_dir, :dest_dir_dev
  end

  def self.make_prod_scaffold
    FileUtils.mkdir_p(self.dest_dir)

    Dir.glob(File.join(self.dist_dir, "**", "*")).each do |file|
      relative_path = file.sub(self.dist_dir + "/", "")
      destination = File.join(self.dest_dir, relative_path)

      if File.directory?(file)
        FileUtils.mkdir_p(destination)
      else
        FileUtils.cp(file, destination)
      end
    end
  end

  def self.make_dev_scaffold
    Dir.mkdir(self.dest_dir_dev) unless Dir.exist?(self.dest_dir_dev)

    # Copy all files from self.dist_dir to self.dest_dir_dev excluding directories, _config.yml, and Gemfile
    Dir.glob("#{self.dist_dir}/**/*").each do |file|
      next if File.directory?(file) || File.basename(file) == "_config.yml" || File.basename(file) == "Gemfile"

      destination_file = File.join(self.dest_dir_dev, file.sub("#{self.dist_dir}/", ""))
      FileUtils.mkdir_p(File.dirname(destination_file))
      FileUtils.cp(file, destination_file)
    end

    # Copy _config.yml only if it does not exist in the destination directory
    config_file = File.join(self.dest_dir_dev, "_config.yml")
    unless File.exist?(config_file)
      FileUtils.mkdir_p(File.dirname(config_file))
      FileUtils.cp(File.join(self.dist_dir, "_config.yml"), config_file)
      puts "Created _config.yml"
    end

    # Copy Gemfile only if it does not exist in the destination directory
    gemfile = File.join(self.dest_dir_dev, "Gemfile")
    unless File.exist?(gemfile)
      FileUtils.mkdir_p(File.dirname(gemfile))
      FileUtils.cp(File.join(self.dist_dir, "Gemfile"), gemfile)
      puts "Created Gemfile"
    end

    puts "Files copied successfully."
  end
end
