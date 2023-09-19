require_relative "flow"
require "optparse" # https://ruby-doc.org/stdlib-2.7.1/libdoc/optparse/rdoc/OptionParser.html

module Flow::CLI
  def self.init
    # Define the available subcommands
    subcommands = {
      "go" => {
        description: "Get the project scaffold",
        handler: -> { puts Flow.scaffold(ARGV.first || Dir.pwd + "/jekyll-flow") },
      },
    }

    # Define the main command
    command = OptionParser.new do |opts|
      opts.banner = "Usage: flow [command] [options]"

      # Specify the available subcommands
      opts.separator ""
      opts.separator "Available commands:"

      subcommands.each do |subcommand, data|
        opts.separator "  #{subcommand}\t\t#{data[:description]}"
      end
    end

    # Parse the command-line arguments
    begin
      command.parse!
    rescue OptionParser::InvalidOption
      puts command
      exit 1
    end

    # Check if a subcommand was provided
    if ARGV.empty?
      puts command
      exit 1
    end

    # Get the subcommand
    subcommand = ARGV.shift

    # Execute the corresponding subcommand if it exists
    if subcommands.key?(subcommand)
      subcommands[subcommand][:handler].call
    else
      puts "Invalid command: #{subcommand}"
      exit 1
    end
  end
end
