---
title: Symbolic Reservations
date: 2015-05-19
tags: core, enumerable, symbols
---

This episode takes a look at the unusual use of symbols in one of Ruby's core APIs:

ARTICLE

## `Enumerable#chunk`

The `chunk` method splits the receiver object into multiple enumerators, using the rule defined in the block. It keeps together the parts that match in series. It then passes the result of this rule and an enumerator of the successive elements to the given block:

    (1..42).chunk{ |n| n % 11 == 0 }.each{ |result, elements|
      puts "#{result}: #{elements * ' - '}"
    }
    # false: 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10
    # true: 11
    # false: 12 - 13 - 14 - 15 - 16 - 17 - 18 - 19 - 20 - 21
    # true: 22
    # false: 23 - 24 - 25 - 26 - 27 - 28 - 29 - 30 - 31 - 32
    # true: 33
    # false: 34 - 35 - 36 - 37 - 38 - 39 - 40 - 41 - 42

You can use this to order numbers in [quotient rings](http://en.wikipedia.org/wiki/Quotient_ring):

    a = (0..4).map{ [] }
    (1..42).chunk{ |n| n % 5 }.each{ |remainder, elements|
      a[remainder] += elements
    }
    puts a.map(&:inspect)
    # [5, 10, 15, 20, 25, 30, 35, 40],    # every number where n % 5 == 0
    # [1, 6, 11, 16, 21, 26, 31, 36, 41], # every number where n % 5 == 1
    # [2, 7, 12, 17, 22, 27, 32, 37, 42], # every number where n % 5 == 2
    # [3, 8, 13, 18, 23, 28, 33, 38],     # every number where n % 5 == 3
    # [4, 9, 14, 19, 24, 29, 34, 39]      # every number where n % 5 == 4

The reason I am bringing it up as *idiosyncratic* is: You can use **special symbols** to influence the behavior of the chunk method, when used as the block return value. Anyone has seen something like this anywhere else in Ruby?

Let's revisit a shortened version of the example at the top:

    (1..42).chunk{ |n| n % 11 == 0 }.to_a
    # => [
    #   [false, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], [true, [11]],
    #   [false, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]], [true, [22]],
    #   [false, [23, 24, 25, 26, 27, 28, 29, 30, 31, 32]], [true, [33]],
    #   [false, [34, 35, 36, 37, 38, 39, 40, 41, 42]]
    # ]

It does nothing, when you pass in an arbitrary symbol as filter rule:

    (1..42).chunk{ :symbol }.to_a
    # => [
    #   [:symbol, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    #   18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    #   36, 37, 38, 39, 40, 41, 42]]
    # ]

However, when passing the special symbol `:_alone`, every element will be separated:

    (1..42).chunk{ :_alone }.to_a
    # => [
    #   [:_alone, [1]], [:_alone, [2]], [:_alone, [3]], [:_alone, [4]], [:_alone, [5]],
    #   [:_alone, [6]], [:_alone, [7]], [:_alone, [8]], [:_alone, [9]], [:_alone, [10]],
    #   [:_alone, [11]], [:_alone, [12]], [:_alone, [13]], [:_alone, [14]],
    #   [:_alone, [15]], [:_alone, [16]], [:_alone, [17]], [:_alone, [18]],
    #   [:_alone, [19]], [:_alone, [20]], [:_alone, [21]], [:_alone, [22]],
    #   [:_alone, [23]], [:_alone, [24]], [:_alone, [25]], [:_alone, [26]],
    #   [:_alone, [27]], [:_alone, [28]], [:_alone, [29]], [:_alone, [30]],
    #   [:_alone, [31]], [:_alone, [32]], [:_alone, [33]], [:_alone, [34]],
    #   [:_alone, [35]], [:_alone, [36]], [:_alone, [37]], [:_alone, [38]],
    #   [:_alone, [39]], [:_alone, [40]], [:_alone, [41]], [:_alone, [42]]
    # ]

There is also the special symbol `:_separator`, which drops every element:

    (1..42).chunk{ :_separator }.to_a
    # => []

Normally you don't want to return `:_alone` or `:_separator` for every element, but in specific instances of your filter rule, which is legit. The question remains, is this a good API for the future of Ruby?

One more thing: Unknown **special symbols** (those that start with `_`) will raise a `RuntimeError`:

    (1..42).chunk{ :_future }.to_a
    # RuntimeError: symbols beginning with an underscore are reserved

## Resources

- [RDoc Enumerable#chunk](http://ruby-doc.org/core-2.2.2/Enumerable.html#method-i-chunk)
