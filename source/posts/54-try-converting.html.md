---
title: Try Converting
date: 2016-05-23
tags: core, types
commit: 98e8de49193e1f636d90431b2374c09ca0de4da7
---

Similar to [metaprogramming](/25-meta-methodology.html), Ruby's type conversion system has evolved over time. While the result functions, it is also a little inconsistent and suffers from poor naming. Let's put things in perspective:

ARTICLE

## Implicit and Explicit Conversion

Ruby objects are usually converted to other classes/types using `to_*` functions. For example, converting the [String](https://ruby-doc.org/core/String.html) `"42"` to a [Float](https://ruby-doc.org/core/Float.html) is done with `to_f`:

    "42".to_f # => 42.0

This process is called **explicit conversion** (you want the object converted).

Some classes provide a second way to convert an object: **implicit conversion** (you expect the object to be of some type).

The following table shows the defined conversion methods of Ruby's important core classes:

 Class    | Explicit Conversion | Implicit Conversion
----------|---------------------|--------------------
 Array    | `to_a`              | `to_ary`
 Hash     | `to_h`              | `to_hash`
 String   | `to_s`              | `to_str`
 Integer  | `to_i`              | `to_int`
 Float    | `to_f`              | -
 Complex  | `to_c`              | -
 Rational | `to_r`              | -
 Regexp   | -                   | `to_regexp`
 IO       | -                   | `to_io`

In most cases you should just go with the explicit conversion method and you are good.

## Expecting a Specific Type

However, things are more complicated in real life. You might, and many of Ruby's core methods do, expect a compatible type that you can deal with. That is where two kinds of indirect conversion methods come into play:

### `.try_convert` Class Methods (Implicit Conversion or `nil`)

Some of Ruby's core classes have a `try_convert` class method. Although its not obvious, which classes have one, and which do not have one (`Array` has one, `Integer` does not), its semantics are pretty clear: It will convert the object into an instance of the class via the **implicit conversion** method (e.g. `to_ary`), or, if no implicit conversion method is defined, will just return `nil`. It will also return `nil`, if the result of the conversion is `nil`, or `nil` was given as argument:

    Array.try_convert(42) # => nil
    Array.try_convert(42..43) # => nil
    Array.try_convert([42, 43]) # => [42, 43]
    Array.try_convert(nil) # => nil

    o = Object.new
    def o.to_ary() [42] end
    Array.try_convert(o) # => [42]

### Uppercased Kernel Methods (Special Conversion or `TypeError`)

Idiosyncratically, there is a third way of converting values: *Uppercased Kernel methods*, like `Array()`.¹ The objects you pass in will be converted to the corresponding class, following the following rules:

- If there is a **special conversion**, apply it. See the table below for details and the exact application order (e.g. `Array()` does its special conversion *after* it tried the two steps below).
- Unless special conversion gets applied, try to convert via the **implicit conversion** method
- If it does not exist, try to convert via the **explicit conversion** method
- Raise a [TypeError](https://ruby-doc.org/core/TypeError.html)² if everything of the above has failed

¹ Although defining uppercased methods for your custom classes to create instances of it looks like an interesting idea at first glance, it is rather confusing. Consider defining class`.[]` instead, which enables a very similar syntax, but uses the real constant it belongs to. An example of such usage is [Set](https://ruby-doc.org/stdlib/libdoc/set/rdoc/Set.html#method-c-5B-5D).<br/>
² Since Ruby 2.6, you can pass in a `exception: false` keyword argument to return `nil` instead of raising an error

## Core Classes Conversion Table

 Class | `.try_convert` | Kernel Method | Kernel Method w/ `nil` | Kernel Method Special
-------|----------------|---------------|------------------------|----------------------
 Array | [Array.try_convert](https://ruby-doc.org/core/Array.html#method-c-try_convert) | [Array()](https://ruby-doc.org/core/Kernel.html#method-i-Array) | `Array(nil) # => []` | If `:to_ary` and `:to_a` did not return an array, it will create single-element array which contains the given value
 Hash | [Hash.try_convert](https://ruby-doc.org/core/Hash.html#method-c-try_convert) | [Hash()](https://ruby-doc.org/core/Kernel.html#method-i-Hash) | `Hash(nil) # => {}` | `Hash([]) # => {}`. Also remember that you can convert arrays to hashes with [Hash.[]](https://ruby-doc.org/core/Hash.html#method-c-5B-5D).
 String   | [String.try_convert](https://ruby-doc.org/core/String.html#method-c-try_convert) | [String()](https://ruby-doc.org/core/Kernel.html#method-i-String) | `String(nil) # => ""` | -
 Integer  | [Integer.try_convert](https://ruby-doc.org/core/Integer.html#method-c-try_convert)⁴ | [Integer()](https://ruby-doc.org/core/Kernel.html#method-i-Integer) | `Integer(nil) # TypeError` | Special behavior for strings: Instead of calling [String#to_i](https://ruby-doc.org/core/String.html#method-i-to_i), it will be more rigid². Takes a second argument defining the [numerical base](https://en.wikipedia.org/wiki/Radix). Also see ³
 Float    | - | [Float()](https://ruby-doc.org/core/Kernel.html#method-i-Float) | `Float(nil) # TypeError` | - ³
 Complex  | - | [Complex()](https://ruby-doc.org/core/Kernel.html#method-i-Complex) | `Complex(nil) # TypeError` | -
 Rational | - | [Rational()](https://ruby-doc.org/core/Kernel.html#method-i-Rational) | `Rational(nil) # TypeError` | -
 Regexp   | [Regexp.try_convert](https://ruby-doc.org/core/Regexp.html#method-c-try_convert) | - | - | -
 IO       | [IO.try_convert](https://ruby-doc.org/core/IO.html#method-c-try_convert) | - | - | -
{:.table-10-20-15-25-X}

.

² It will only convert strings that contain exactly an integer. It would not accept "42A", which `String#to_i` would happily take. It also accepts [radix prefixes and numbers that contain underscores](https://idiosyncratic-ruby.com/39-fixed-numbers.html), so basically it accepts the same format that is valid for direct integer literals in Ruby. Will raise an `ArgumentError` if an invalid string is passed in.<br/>
³ It will convert to other low-level numerical types (such as integers and floats) directly, so `Float(4)` will *not* call `4.to_f`<br>
⁴ Added in Ruby 3.1

## When to Use What?

* Prefer **explicit conversion**: `to_*` methods
* Use `.try_convert` for **implicit conversion**
* Use the uppercased Kernel methods for their special effects, like `Array()` for wrapping single arguments in an arrays, or `Integer()` for strict integer conversion
