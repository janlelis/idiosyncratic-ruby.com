---
title: "Warning: The Experiment"
date: 2020-08-03
tags: core, debug, cli
commit: 8e88e9738e96aecbd18d05ccb5d92f0f6fb3cf30
---

Ruby's [**Warning** module](https://ruby-doc.org/core/Warning.html) learned some new tricks in Ruby 2.7:

ARTICLE

Support for muting different categories of compile warnings has been introduced. This is a mechanism on top of the warning level reflected by the [**$VERBOSE** variable](/3-ruby-can-you-speak-louder.html#command-line-options-for-debug-modes).

You can now silence **deprecation warnings:** These are aspects of the language which will be removed or changed in a future version of Ruby. One example is the infamous: `warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call`. Since Ruby 3.0, deprecation warnings are *not shown* by default, so you will need to explicitly turn them on.

It is also possible to mute **experimental features warnings:** These are new features of Ruby, which might not have a stable API yet, like the [new pattern matching](/68-assignments-in-style.html)

## Per Ruby

    Warning[:experimental] = false
    Warning[:deprecated] = true

## Per CLI

    $ ruby -W:no-experimental
    $ ruby -W:deprecated

## Per ENV Variable

    $ RUBYOPT="-W:no-experimental" ruby
    $ RUBYOPT="-W:deprecated" ruby

## Also See

- [Warning: The Module](/65-warning-the-module.html)