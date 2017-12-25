---
title: Sad Methods
date: 2016-05-07
tags: core, cruby, reflection, metaprogramming
commit: dcad9080db57bce96f53019244d609e554c81975
---

In general, Ruby's [reflection capabilities](https://en.wikipedia.org/wiki/Reflection_%28computer_programming%29) are pretty powerful, although [not always logical](https://idiosyncratic-ruby.com/25-meta-methodology.html). However, when reflecting on a method's (or proc's) usage, you are sometimes stuck with **sad methods**.

ARTICLE

Sad methods only work for code, that is written in Ruby itself. And Ruby itself (official MRI) is written in C, which limits such methods' usefulness quite a lot. This is an implementation specific problem, and it naturally does not occur in implementations like [Rubinius](http://rubinius.com/). The following three methods are affected:

## Arity

The arity of a method (or proc) will return:

- A positive number if the method has a fixed number of arguments
- A negative number if the method has a variable number of arguments, the value denoting the number of required arguments

For example:

    method(:require).arity # => 1

However: [For methods written in C, returns -1 if the call takes a variable number of arguments](https://ruby-doc.org/core/Method.html#method-i-arity)

    method(:puts).arity # => -1

## Source Location

The `source_location` of a method (or proc) returns a two-element array containing the path to the source file and the line number, where it is defined:

    method(:require).source_location
    # => ["/home/jan/.rvm/rubies/ruby-2.3.0/lib/.../core_ext/kernel_require.rb", 39]

However: [Returns […] nil if this method was not defined in Ruby (i.e. native)](https://ruby-doc.org/core/Method.html#method-i-source_location)

    method(:puts).source_location # => nil

## Parameters

The `Method#parameters` method lets inspect what kind of parameters a method (or proc) takes:

    FileUtils.method(:cd).parameters
    # => [[:req, :dir], [:opt, :options], [:block, :block]]

However: Like `arity`, it will treat all C methods with multiple arguments as "variable number of arguments", instead of providing exact information:

    Module.instance_method(:define_method).parameters
    #=> [[:rest]]

## Also See

- [method_source: Retrieve the method source via source_location](https://github.com/banister/method_source)
- [howtocall: Extended version of `Method#parameters`](https://github.com/janlelis/debugging#howtocallobj--self-method_or_proc)
