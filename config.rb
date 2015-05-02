###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  blog.permalink = "{no}-{title}.html"
  blog.sources = "posts/{no}-{title}.html"
  blog.layout = "layouts/post.html"
  blog.summary_separator = /ARTICLE/
  blog.default_extension = ".md"
  blog.tag_template = "tag.html"
  # blog.taglink = "tags/{tag}.html"
end

page "/feed.xml", layout: false

###
# Compass
###

# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# page "/path/to/file.html", layout: false
# page "/path/to/file.html", layout: :otherlayout
#
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# activate :automatic_image_sizes
# activate :livereload

# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :asset_hash
  # activate :relative_assets
  # set :http_prefix, "/Content/images/"
end
