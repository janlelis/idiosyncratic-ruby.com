---
title: ERB Render Standard
date: 2016-05-05
tags: stdlib, erb, hash, binding
commit: 030d6a66d980cce63e6b16e3d05b757e968f1040
---

ERB stands for *<%# Embedded Ruby %>* and is the templating engine included in the Ruby Standard Library. While there are more recent gems that provide a better templating experience (see [tilt](https://github.com/rtomayko/tilt) for an abstraction, and [erubis](http://www.kuwata-lab.com/erubis/)/[erbse](https://github.com/apotonick/erbse) for an updated ERB), it is also convenient to have basic support directly in the standard library.

ARTICLE

However, it does not directly support rendering data from a [Hash](https://ruby-doc.org/core/Hash.html), but only from a [Binding](https://ruby-doc.org/core/Binding.html) object:¹

¹ **Update:** [It is now possible with Ruby 2.5 -- click here to see the best best practice](#how-to-render-an-erb-template-post-25)

## How to Render an ERB Template² (Pre 2.1)

    require "erb"
    require "ostruct"

    def render_erb(template, data = nil)
      ERB.new(template, nil, "%<>").result(
        OpenStruct.new(data).instance_eval { binding }
      )
    end

    example_data = {
      idiosyncratic: "Ruby"
    }

    example_template = <<TEMPLATE
    <%= idiosyncratic %> 3.0
    TEMPLATE

    render_erb(example_template, example_data) # => "Ruby 3.0\n"

² Actually, this also supports a (quite useful) additional syntax of ERB templates, "percent-lines":

    example_template2 =<<TEMPLATE
    % calculation = 2 + 1
    Result is: <%= calculation %>
    TEMPLATE

    render_erb(example_template2) # => "Result is: 3\n"

## How to Render an ERB Template (Post 2.1)

Ruby 2.1 came with [Binding#local_variable_set](https://ruby-doc.org/core/Binding.html#method-i-local_variable_set), so we can remove [OpenStruct](https://ruby-doc.org/stdlib/libdoc/ostruct/rdoc/OpenStruct.html) from the equation:

    require "erb"

    def render_erb(template, data = {})
      render_binding = binding
      data.each{ |key, value| render_binding.local_variable_set(key.to_sym, value) }
      ERB.new(template, nil, "%<>").result(render_binding)
    end

    example_data = {
      idiosyncratic: "Ruby"
    }

    example_template = <<TEMPLATE
    <%= idiosyncratic %> 3.0
    TEMPLATE

    render_erb(example_template, example_data) # => "Ruby 3.0\n"

**Note:** Both versions' bindings also contain the method arguments of `render_erb`, so you can access `template` and `data` from within the template. If you don't like this, you can can use [`TOPLEVEL_BINDING.dup` to work around the local parameters](/44-top-level-binding.html).

## How to Render an ERB Template (Post 2.5)

Ruby 2.5 finally introduces a way to render hashes:

    require "erb"

    def render_erb(template, data = {})
      ERB.new(template, nil, "%<>").result_with_hash(data)
    end

    example_data = {
      idiosyncratic: "Ruby"
    }

    example_template = <<TEMPLATE
    <%= idiosyncratic %> 3.0
    TEMPLATE

    render_erb(example_template, example_data) # => "Ruby 3.0\n"

## Also See

- [RDoc: ERB](https://ruby-doc.org/stdlib/libdoc/erb/rdoc/ERB.html)
- [Tiny command-line tool that renders an ERB template with data from a YAML file](https://github.com/janlelis/derb/blob/master/bin/derb)
- [Snippets for Sublime Text](https://github.com/janlelis/productive-sublime-snippets-erb)
