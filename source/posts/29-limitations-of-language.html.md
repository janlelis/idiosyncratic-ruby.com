---
title: Limitations of Language
date: 2015-05-29
tags: syntax, grammar
commit: cdc80a62c207f966f5391f36ce9767ed41c7beb3
---

If you take a closer look, you'll notice that Ruby's grammar has quite a few edge-case where its syntax is inconsistent or ambiguous:

ARTICLE

## Binary Minus vs Minus taken as Unary Method Argument

    >> [1,3,4,5].size - 1
    # => 3

    >> [1,3,4,5].size -1
    # wrong number of arguments(1 for 0)

## No Simple Rule, if a Symbol can be Displayed Without the Explicit `:""` Syntax

    >> {:< => 0}
    # => {:<=>0}

    >> {:<=>0}
    # syntax error, unexpected tINTEGER,
    # expecting tASSOC

## Different Rules for Modules and Classes

    >> module Eurucamp end
    # => nil

    >> class Eurucamp end
    # syntax error, unexpected $end

**Update:** Since Ruby 2.3 this is no longer invalid syntax:

    >> class Eurucamp end
    # => nil

## Ambiguous if to Parse `~` Unary or as Part of Binary Match Operator

    >> $_="Eurucamp X"
    >> ~/X/ # => 9

    >> a=~/X/ # undefined local variable or method `a'
    >> a= ~/X/ # => 9

## Global Variables can "Break" String and Regex Syntax

    >> a = "Eurucamp #\n"
    >> a.gsub /#$/, ''
    # => ?

    >> a = "Eurucamp #\n"
    >> a.gsub /#$/, ''
    # unterminated regexp meets end of file

    >> a = "Eurucamp #\n"
    >> a.gsub /#$//, ''
    # => "Eurucamp #"

## Unary or Binary Plus, Part 2

    >> p +21
    # => 21

    >> p = 21
    >> p +21
    # => 42

## String Creation vs Format Method

    >> puts%[1]
    # undefined method `%' for nil:NilClass

    >> puts %[1]
    # => 1

## Hash vs Block

Ruby uses curly braces for both, blocks as well as hashes. Sometimes, this leads to confusing cases:

    >> def identity(a) a end

    >> identity(1)
    #=> 1
    >> identity 1
    #=> 1
    >> identity({})
    #=> {}
    >> identity {}
    #=> wrong number of arguments (0 for 1) (ArgumentError)

## Regex vs Division

    >> puts /4/i
    # => (?i-mx:4)

    >> puts, i = 42, 2
    >> puts /4/i
    # => 5

## Further Reading

- [Ruby's grammar definition](https://github.com/ruby/ruby/blob/trunk/parse.y)
