---
title: Too Expressive & * _ ?
date: 2016-05-02
tags: core, syntax
---

Ruby's syntax is so expressive — it utilizes every printable, non-alphanumeric ASCII character as much as it cans. Sometimes, this can be confusing for beginners.

ARTICLE

The next sections show 4+ different meanings of every portrayed single character (not counting different meaning as [custom string delimiter](http://idiosyncratic-ruby.com/15-207-ways-to-rome.html) or meaning within a regex):

## Question Mark (4 Syntactical Meanings)

The question mark is a sure way to [confuse your syntax highlighter](http://idiosyncratic-ruby.com/1-test-highlights.html)!

### Valid ending of a method name

    [].empty? # => true

### `?:` Part of the Ternary Operator

    nil ? true : false # => false

### `?` char literals

    ?? # => "?"

### Part of Special Variable `$?`

    system "ls"
    $? #=> #<Process::Status: pid 5223 exit 0>

## Underscore (4 Syntactical Meanings)

Underscores serve as a good example of having multiple uses: No purpose iterferes with another.

### Valid Part of an Identifier (and `$_`)

    variable_name = 42

### Part of Special Keywords (`__END__`, `__FILE__`, `__caller__`)

    File.dirname(__FILE__)

### Allowed to Visually Separate Numbers

    1_000_000 # => 1000000

### Ignored Parameter

    # other names would raise an SyntaxError (duplicated argument name)
    def method_name(_,_)
      p _
    end

    method_name(42, 23)
    # -> 42

## Ampersand (6 Syntactical Meanings)

Ruby 2.3 introduced the "safe navigation operator" which uses `&`:

### `&.` Safe Navigation Operator

    nil&.blank? # => nil

### `&&` Method/Operator

    p true && false
    # => false

### `&` Method/Operator for Numbers, Arrays, Booleans

    # set operation "and"
    [1, 2] & [2] # => 2

    # bit operation "and"
    2 & 3 # => 2

### Explicit Block Param

    def method_name(&block)
      p block.call(1)
      p block.call(2)
    end

    method_name{ |x| x.odd? }
    # -> true
    # -> false

### `to_proc` Shortcut

    class Class
      def to_proc
        lambda{ |*args| self.new(*args) }
      end
    end

    [[1,2],[3,5,6,7,3]].map(&Set) # => [Set[1,2], Set[5,6,7,3]]

### Part of Special Variable `$&`

    /sync/ =~ "Idiosyncratic"
    $& # => "sync"

## Star (7 Syntactical Meanings)

The record holder!

### `.*` Method/Operator for Numbers, Strings, Arrays

    4 * 4 # => 16
    ["4", "2"] * "." # => "4.2"

### `.**` Method/Operator for Numbers

    4 ** 4 # => 256

### `*` Rest Arguments

    def method_name(*arguments)
      p arguments
    end

    method_name(42, 23)
    # -> [42, 23]

### `*` Splat Arguments

    [1, *2..4] # => [1, 2, 3, 4]

### `**` Keyword Rest Arguments

    def method_name(**arguments)
      p arguments
    end

    method_name(a: 42, b: 23)
    # -> { a: 42, b: 23 }

### `**` Keyword Splat Arguments

    hash1 = { a: 1, b: 2 }
    hash2 = { c: 3, **hash1 } # => { a: 1, b: 2, c: 3 }

### Part of Special Variable `$*`

    $ ruby -e "p $*" -- 42 23
    ["42", "23"]

## Also See

* [What do you call this in Ruby?](https://github.com/JuanitoFatas/what-do-you-call-this-in-ruby)
* [Ruby's Grammar Definition](https://raw.githubusercontent.com/ruby/ruby/trunk/parse.y)
* [Speial Global Variables](http://idiosyncratic-ruby.com/9-globalization.html)
