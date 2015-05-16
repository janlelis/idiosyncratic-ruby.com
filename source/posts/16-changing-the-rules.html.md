---
title: Changing the Rules
date: 2015-05-16
tags: core, globals, golf
commit: b9c9f434713b5fda5169a46f4bb982c29bd8dab3
---

Ruby allows you to change key functionality of the language. This means, it is also possible to break key functionality! Six examples of Ruby code you should never use:

ARTICLE

## Undefining Core Methods

The simplest way to change Ruby's global behavior is monkey patching: Nothing stops you from altering important core methods:

    class Module; undef append_features; end

This line will break the ability to mix-in modules:

    Math.sin 42 # => -0.9165215479156338
    include Math
    # NoMethodError: undefined method `append_features' for Math:Module

## Everything `nil`

No more `NoMethodError: undefined method` or `NameError: uninitialized constant`:

    class BasicObject
      def self.const_missing(*)
      end

      def method_missing(*)
      end
    end

Nothing will fail, anymore. Not a good idea. Also see: [Hopless Egocentricity](https://github.com/raganwald-deprecated/homoiconic/blob/master/2009-02-02/hopeless_egocentricity.md)

    IDio.synCRATIC # => nil

## Alternative Hash Access Semantics

You can redefine hash semantics, to raise an error, if a key was not found:

    class Hash
      alias [] fetch
    end

Now you will always get `KeyError` instead of `nil`:

    { "Idiosyncratic": "Ruby" }["Sane"]
    # `fetch': key not found: "Sane" (KeyError)

You could argue that this is much cleaner than the normal semantics, but you won't be compatible with the rest of the world.

## Manipulate Global Randomness

Don't use `Kernel#rand`, `Array#shuffle` or `Array#sample`. [Always use](https://coderwall.com/p/oijyja/array-sample-and-array-shuffle-using-securerandom) [SecureRandom!](http://ruby.janlelis.de/67-ruby-and-random)

    srand 84 # => (something)
    rand 100 # => 42

## Change a Global Default Separator

Four of [Ruby's special two-letter globals](http://idiosyncratic-ruby.com/9-globalization.html) are called *record separators* and they affect the behaviour of various methods in Ruby:

 Variable | Name                    | Default | Examples for Methods Affected
----------|-------------------------|---------|------------
 `$;`     | (Input) Field Separator | `nil`   | `String#split`
 `$,`     | Output Field Separator  | `nil`   | `Array#join`
 `$/`     | Input Record Separator  | `"\n"`  | `Kernel#gets`, `IO#readlines`
 `$\`     | Output Record Separator | `nil`   | `Kernel#print`, `IO#write`
{:.table-15-30-15-X}

Not only your own code is affected, but also core functionality. For example, changing the default output separators also changes Ruby's error messages:

    >> $, = "YIKES"
    >> 123abc
    SyntaxErrorYIKES: YIKES(irb):2: syntax error, unexpected tIDENTIFIER, \
    expecting end-of-inputYIKES
      from /home/user/.rvm/rubies/ruby-2.2.2/bin/irb:11:in `<main>'YIKES

## Disabling Garbage Collection

Be careful! This might cause your machine to freeze or even worse!

    GC.disable
    100_000_000.times.each{ |i| "#{i}" }
