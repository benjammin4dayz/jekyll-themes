require_relative "utils"

module Flow
  # https://stephenagrice.medium.com/making-a-command-line-ruby-gem-write-build-and-push-aec24c6c49eb
  def self.hello
    ["Flow | A Jekyll Theme by Benjammin4dayz",
     "Generating your template..."]
      .join("\n")
  end

  def self.prod_scaffold
    Utils.make_prod_scaffold()
  end

  def self.dev_scaffold
    Utils.make_dev_scaffold()
  end
end
