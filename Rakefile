require 'middleman-gh-pages'

desc "Builds, publishes, and deploys to server"
task :deploy => :publish do
  sh "git checkout gh-pages && git pull origin gh-pages && git push production gh-pages:master -f && git checkout -"
end
