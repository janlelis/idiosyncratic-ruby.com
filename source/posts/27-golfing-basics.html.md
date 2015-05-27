---
title: Golfing Basics
date: 2015-05-27
tags: syntax, golf, strings
commit: 23e16d087f6c9718a977efa41b6651a684c403e6
---

**Code Golf** is the art of writing the shortest program possible. The less bytes the better. And the competition is just ridiculously strong! Head over to [Anarchy Golf](http://golf.shinh.org/) if you want to see more!

ARTICLE

A good beginner's problem is printing out [Pascal's Triangle](http://golf.shinh.org/p.rb?pascal+triangle): Spend a few days to get to **45** bytes. Spend a few *months* to get to **43** bytes!

## 10 Ruby Tricks You'll Learn by Playing Code Golf

While code golfing does not necessarily make you a better programmer, you can learn a lot about the programming language you are using. Here are some things that were new to me:

## Dirty Interpolation

String interpolation (`#{}`) is sometimes possible without using curlies:

    "You can directly interpolate #@instance variables, " \
    "#@@class variables, and #$global variables!"

I must admit, this can confuse newcomers, but it looks fantastic!

## Constant Assignment in Modifiers

It is perfectly legit to use assignments in conditions:

    if a = 42
      p a
    end
    # => 42

 However, this won't work with the shorter *modifier* syntax:

    p b if b = 42
    # NameError: undefined local variable or method `b'...

Unless… you use constants:

    p C if C = 42
    # => 42

## Shebang `require`

What could possibly be shorter than:

    require'json'; require 'yaml'
    p JSON,YAML

It's inlined command-line options:

    #!ruby -rjson -ryaml
    p JSON,YAML

## Iterating Input Lines

Finding the shortest way to read user input is a common problem for golfers and solutions vary, depending on how to process the input. My favorite one is to iterate over the input's lines:

    $<.each{|e|p e}

## Appending Output

`puts` and `p` are already good candidates to output content. However, sometimes, using `<<` on `STDOUT` is a tiny bit (or byte) more efficent:

    ?a.upto(?z){|o|$><<o}

## Regex Always Wins

This is one of the golden rules of golfing. Especially, combining the [block syntax of `gsub`](http://ruby-doc.org/core-2.2.2/String.html#method-i-gsub) with the [perlish regex variables](http://idiosyncratic-ruby.com/9-globalization.html) can be very expressive!

    "some_string".gsub(/(^|_)(\w)/){$2.upcase}

## `String#tr`

However, it's not true - regexes do not always win. If you need to perform some simple character substitutions, [tr](https://en.wikipedia.org/wiki/Tr_%28Unix%29) is an extremly short (and also clean) way to do so:

    # ROT13 Cipher
    "Vqvbflapengvp Ehol".tr'a-zA-Z','n-za-mN-ZA-M'
    # => "Idiosyncratic Ruby"

## One More or Less

In some instances, you cannot use `i+1` or `i-1` without wrapping them in parenthesis. No problem, [unary complement](http://ruby-doc.org/core-2.2.2/Fixnum.html#method-i-7E) to the rescue:

    -~42 # => 43
    ~-42 # => 41

## Flexible Precedence

This is one of my favorites: Explicitely call (`.`) operators for alternative precedence semantics:

    3*(2+1) #=> 9
    3.*2+1 #=> 9

## Quick Quit

What's a shorter way to quit a Ruby script than the 4 bytes long `exit` method?

    1/0

Although this is longer than `z` (calling an undefined method), it's often easier to trigger programmatically.