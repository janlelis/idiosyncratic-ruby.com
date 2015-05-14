---
title: Meeting some Locals
date: 2015-05-14
tags: syntax, regex
---

There are two very different ways to create local variables in Ruby. You are probably familiar with the classical way:

    a, b = "$", "€"
    a # => "$"
    b # => "€"

It is simple to understand and looks good. But Ruby would not be Ruby, if there weren"t for more obscure ways to assign variables: You could rewrite the previous example to create local variables in a more subtle way:

    %r<(?'a'.)(?'b'.)>=~"$" "€"
    a # => "$"
    b # => "€"


This implicit creation of local variables is not recommended, because obviously, it violates **PrOWCoFoHuNoMa** (Principle of writing code for humans, not machines).

By the way, this will not work, when you swap operands:

    "$" "€"=~%r<(?<a>.)(?<b>.)>
    a # NameError: ...

## One More Option

There is also a third way to set local variables: binding's `local_variable_set`, but it does not really count, since you cannot introduce new variables this way:

    a = nil
    binding.local_variable_set :a, "$"
    binding.local_variable_set :b, "€"
    a # => "$"
    b # NameError: ...

## Resources
- [RDoc: Regexp#=~](http://ruby-doc.org/core-2.2.2/Regexp.html#method-i-3D-7E)
- [RDoc: Binding#local_variable_set](http://ruby-doc.org/core-2.2.2/Binding.html#method-i-local_variable_set)