---
title: Operating Nothing
date: 2015-05-28
tags: core, strings
commit: c32ba09fcb552e7ff87e2ba22442bbd6c138b6de
---

There is an operator in Ruby, that does nothing: The [unary plus operator](https://github.com/ruby/ruby/blob/v2_2_2/numeric.c#L367-L371). It is part of the language for [keeping symmetry with the unary minus operator](http://stackoverflow.com/questions/5680587/whats-the-point-of-unary-plus-operator-in-ruby)!

ARTICLE

This is awesome, an operator for free! What can be done with it?

## 1 | Logging

    require 'logger'

    # Definition
    $logger = Logger.new(STDOUT)

    class Object
      def +@
        $logger.warn(self.inspect)
      end
    end

    # Usage
    +/Ruby/
    # => W, [2015-05-28T10:52:51.115334 #16630]  WARN -- : /Ruby/

We could use it for logging. But this is more of the category *nice, but feels like there is no real reason for the syntactic sugar*.

## 2 | Null Objects

A more useful case would be to simplify often done object conversions, for example, converting [null objects](http://devblog.avdi.org/2011/05/30/null-objects-and-falsiness/) to actual `nil` for comparsions:

    # Definition
    class Object
      def +@
        null? ? nil : self
      end

      def null?
        false
      end
    end

    class NilClass
      def null?
        true
      end
    end

    # Usage
    class CustomNullObject
      def null?
        true
      end
    end

    null = CustomNullObject.new

    +nil #=> nil
    +null #=> nil
    +"Ruby" #=> "Ruby"

See [null_question](https://github.com/janlelis/null_question) and [null_plus](https://github.com/janlelis/null_plus) for a gemified version of the code above.

## 3 | Symbol Conversion

Another conversion related use of `+@` is the following snippet, which also defines `-@`. It will convert `String` and `Symbol` into each other's representation. It can be used as some kind of alternative to libraries that provide [HashWithIndifferentAccess](http://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html)-kind functionality, by always explicitely converting the key:

    # Definition
    class String
      def +@
        self
      end

      def -@
        to_sym
      end
    end

    class Symbol
      def +@
        to_s
      end

      def -@
        self
      end
    end

    # Usage
    hash   = { key: "value" }
    symbol = :key
    string = "key"

    hash[-symbol] # => "value"
    hash[-string] # => "value"

By the way, this would not be needed, if we [make symbols frozen strings](https://speakerdeck.com/sferik/symbols)!

## 4 | Test Rocket!

Thinking further: How to get most of out operators? How about a testing framework:

    require 'testrocket'

    # BASIC USAGE
    # +-> { block that should succeed }
    # --> { block that should fail }

    +-> { Die.new(2) }
    --> { raise }
    +-> { 2 + 2 == 4 }

    # These two tests will deliberately fail
    +-> { raise }
    --> { true }

    # A 'pending' test
    ~-> { "this is a pending test" }

    # A description
    !-> { "use this for descriptive output and to separate your test parts" }

See [peterc/testrocket](https://github.com/peterc/testrocket) for further info!

## 5 | Superators!

There was a library that carried operator magic to the extremes: It let you define *superators*, which are new binary operators that use a chain of unary operators as their name! This is what it looked like:

    # Definition
    class Array
      superator "<---" do |operand|
        if operand.kind_of? Array
          self + operand.map { |x| x.inspect }
        else
          operand.inspect
        end
      end
    end

    # Usage
    [1,2,3] <--- [4,5,6]

The library is not maintained, anymore, but it is the craziest leveraging of Ruby's capabalities I've ever seen! The repo is at [jicksta/superators](https://github.com/jicksta/superators).
