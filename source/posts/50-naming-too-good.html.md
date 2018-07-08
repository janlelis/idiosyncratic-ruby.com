---
title: Naming Too Good
date: 2016-05-19
tags: core, api
commit: 327e6ede5bb9fff2889fe8416f424a20561a1e0f
---

Some words should not be chosen as identifiers for variables, parameters and methods in Ruby, because they clash with core methods or keywords.

ARTICLE

As long as you do not define a method with the name of a keyword, Ruby will not complain. Still, it is often better to avoid naming things like existing methods. It carries potential for future bugs and also confuses newcomers. You might change the name in the future, but miss some occurrences, which will then do something completely different. It also [makes debugging harder](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html#what-if-the-thing-implements-the-method-method).

A simple workaround is to append an `_` to critical identifiers. Some variables names that I find myself wanting to choose sometimes, but which should not (or cannot) be used:

## `class`

`class` is a keyword so this is invalid code:

    class = Thread

When referencing classes in your code the most common convention is to use `klass` instead.

## `in`

An example where this rarely used keyword (which is part of the `for` loop syntax) prevents good naming is working with streams:

    require 'open3'
    Open3.popen3(cmd){ |in, out, err|
      # ...
    }

## `method`

A common pattern:

    def send_somewhere(method, something)
      # ...
      public_send(method)
      # ...
    end

Conflicts with: [Object#method](https://ruby-doc.org/core/Object.html#method-i-method)

## `hash`

Calculating a hash:

    require "digest/sha2"
    hash = Digest::SHA256.hexdigest "ö"

Conflicts with: [Object#hash](https://ruby-doc.org/core/Object.html#method-i-hash)

## `format`

"format" is a typical name for a keyword argument:

    def something(format: "json")
      # ...
    end

I still do it sometimes, but it conflicts with: [Kernel#format](https://ruby-doc.org/core/Kernel.html#method-i-format)

## `display`

[Object#display](https://ruby-doc.org/core/Object.html#method-i-display) should also [be avoided](https://chrisarcand.com/the-search-for-class0x0000001ab51700/)!
