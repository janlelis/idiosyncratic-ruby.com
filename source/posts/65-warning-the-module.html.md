---
title: "Warning: The Module"
date: 2018-05-15
tags: core, debug
commit: cad95d1018a9da5c4289070e2da033fe0306d2ff
---

Starting with Ruby 2.5¹ it is possible to customize the behavior of [Kernel#warn](https://ruby-doc.org/core/Kernel.html#method-i-warn) through the [**Warning** module](https://ruby-doc.org/core/Warning.html). Here is how:

ARTICLE

    def Warning.warn(w)
      # super calls the original behavior, which is printing to $stderr
      super "\e[31;1mRUBY WARNING: \e[22m#{w.sub(/warning: /, '')}\e[0m"
    end

    # # #
    # examples

    warn "test"
    # => RUBY WARNING: test

    { a: 1, a: 2 }
    # => RUBY WARNING: (irb):4: key :a is duplicated and overwritten on line 4

    $VERBOSE = true # shows level 2 warnings
    def a() end
    def a() end
    # => RUBY WARNING: (irb):8: method redefined; discarding old a
    # => RUBY WARNING: (irb):6: previous definition of a was here

You can unlock some more **warning** features by using [Jeremy Evans' warning gem](https://github.com/jeremyevans/ruby-warning/):

    require "warning"

    Warning.ignore /duplicated and overwritten/
    { a: 1, a: 2 }
    # => nothing

    $VERBOSE = true
    Warning.ignore :method_redefined
    def a() end
    def a() end
    # => nothing

¹ Although the **Warning** module existed in Ruby 2.4 already, **Kernel#warn** did not make use of it yet

## Further Reading

- [Ruby's verbosity and debug modes](/3-ruby-can-you-speak-louder.html#command-line-options-for-debug-modes)