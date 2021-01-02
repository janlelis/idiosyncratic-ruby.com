---
title: Meeting some Locals
date: 2015-05-14
tags: syntax, regex
commit: 35cc9cf6601b47edca82e29ad6b8f6f8f7b0fe4d
---

There are two very different ways to create local variables in Ruby. You are probably familiar with the classical way:

ARTICLE

    a, b = "$", "€"
    a # => "$"
    b # => "€"

It is simple to understand and looks good. But Ruby would not be Ruby, if there weren't for more obscure ways to assign variables: You could rewrite the previous example to create local variables in a more subtle way:

    %r<(?'a'.)(?'b'.)>=~"$" "€"
    a # => "$"
    b # => "€"

## Implicit Local Variables Through Regex Matching

Without the fancy obfuscations, the example above would look like this:

    /(?<a>.)(?<b>.)/ =~ "$€"
    a # => "$"
    b # => "€"

The regex matching operator `=~` will create new local variables, when used together with [named captures](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Capturing). However, this is not recommended, because obviously, it violates **PrOWCoFoHuNoMa** (Principle of writing code for humans, not machines).

By the way, this will not work, if you swap operands:

    "$€" =~ /(?<a>.)(?<b>.)/
    a # NameError: ...

## One More Option (Almost!)

In actuality, there is also a third way to set local variables: binding's `local_variable_set`, but it does not really count, since you cannot introduce new variables this way:

    a = nil
    binding.local_variable_set :a, "$"
    binding.local_variable_set :b, "€"
    a # => "$"
    b # NameError: ...

## Ruby 3.0 Update: Right Hand Assignment

Whoa!

    %w[$ €] => [a, b]
    a # => "$"
    b # => "€"

Read more in [Episode 68: Assignments In-Style](/68-assignments-in-style.html)

## Resources
- [RDoc: Regexp#=~](https://ruby-doc.org/core/Regexp.html#method-i-3D-7E)
- [RDoc: Binding#local_variable_set](https://ruby-doc.org/core/Binding.html#method-i-local_variable_set)
