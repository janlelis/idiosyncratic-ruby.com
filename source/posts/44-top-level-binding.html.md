---
title: Top Level Binding
date: 2016-05-31
tags: core, stdlib
---

In case you have wondered, what this top-level constant `TOPLEVEL_BINDING` is all about:

ARTICLE

It is, as its name suggest, the [Binding](http://ruby-doc.org/core-2.3.1/Binding.html) of your script's main scope:

    a = 42
    p binding.local_variable_defined?(:a) # => true
    p TOPLEVEL_BINDING.local_variable_defined?(:a) # => true

    def example_method
      p binding.local_variable_defined?(:a) # => false
      p TOPLEVEL_BINDING.local_variable_defined?(:a) # => true
    end
    
    example_method

## What is a practical use of it?

Besides being a general default binding for your application ([which is used in IRB](https://github.com/ruby/ruby/blob/v2_3_1/lib/irb.rb#L373)), it can act also as the missing `Binding.new`:

    clean_binding = TOPLEVEL_BINDING.dup

Assuming a more complex/structured application (instead of a single-file script), the top-level binding is mostly empty or consists of just a few important variables.

In fact, this is how [it is utilized in stdlib's ERB implementation](https://github.com/ruby/ruby/blob/v2_3_1/lib/erb.rb#L872-L875).
