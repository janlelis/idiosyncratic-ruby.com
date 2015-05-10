---
title: Know your Environment
date: 2015-05-10
tags: core
---

Ruby's [ENV object](http://ruby-doc.org/core-2.2.2/ENV.html) gives you accss to [enviroment variables](http://en.wikipedia.org/wiki/Environment_variable). It looks like normal [Ruby hash](http://ruby-doc.org/core-2.2.2/Hash.html):

ARTICLE

    ENV["TERM"] #=> "xterm"
    ENV["SOMETHING"] = "NEW" #=> "NEW"

But this is only the surface. Turns out `ENV` is a *special object*:

    ENV.class #=> Object

It is hash-like, but lacks some functionality:

    ENV.flatten # NoMethodError
    ENV.default = "MyNullObject" # NoMethodError

Besides this, it behaves like an ordinary hash:

    ENV["my_value"] = "something"
    ENV[42] = "oops" # not quite: TypeError

Another thing that is missing: Merging the `ENV` hash with another hash:

    ENV.merge(Idiosyncratic: "YES") # NoMethodError

## Resources

- [Source: ENV](https://github.com/ruby/ruby/blob/trunk/hash.c)
- [Rubinius Source: ENV](https://github.com/rubinius/rubinius/blob/master/kernel/common/env.rb)