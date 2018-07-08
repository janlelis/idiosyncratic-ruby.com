---
title: Struggling Four Equality
date: 2016-05-24
tags: core, equal, types
commit: 3fcc648f2aba9272d2418d56025b8f817ca16423
---

Another of Ruby's idiosyncrasies is equalness. It's not too complicated, but naming is an issue here.

ARTICLE

## Four Concepts of Equalness

### `equal?` Object Identity Comparison

This one is easy. Two objects should be considered identical. Think: `x.object_id == y.object_id`

### `==` Equality Equality

This is the usual method to care about. Two objects should be treated the same. If the class supports the [`<=>` spaceship comparison operator](https://ruby-doc.org/core/Comparable.html), it is expected that `==` returns `true` for the same values, `<=>` returns `0` for.

### `eql?` Hash Key Equality

Normally, this is the same as `==`: ["…`eql?` is usually aliased to the overridden `==` method"](https://ruby-doc.org/core/Hash.html#class-Hash-label-Hash+Keys)

The most important effect of the result of `eql?` is to distinguish between hash keys: ["Two objects refer to the same hash key when their `hash` value is identical and the two objects are `eql?` to each other"](https://ruby-doc.org/core/Hash.html#class-Hash-label-Hash+Keys). A real life example:

    1 == 1.0 # => true
    1.eql?(1.0) # => false

    # this means that the following will be treated as two different keys
    {1: "Idiosyncratic", 1.0 "Hash"}

So `eql?` is a little stricter than `==`, because it will return `false` if two objects are not instances of the same class. A typical implementation looks like this:

    def eql?(other)
      instance_of?(other.class) && self == other
    end

### `===` Fancy Equality

Implicitly used for `case` statements. Usually like `==`, but can also mean that something has some kind of relationship, like being [some kind of a class](https://github.com/janlelis/sig/blob/v1.0.1/lib/sig.rb#L108-L129).

## Equality Implementations for Core Classes

Class             | `eql?` | `==` | `===`
------------------|--------|------|------
 Object           | Identity (like `equal?`) | Same as `eql?` | Same as `==`
 Symbol           | -      | -    | -
 Numeric          | Same type, same value | Same value, according to [spaceship returning `0`](https://ruby-doc.org/core/Numeric.html#method-i-3C-3D-3E) | -
 String           | Same length, same contents | If other is a String: `eql?`, else: `other.to_str === self` | -
 Regexp           | If other is a Regexp: Same pattern, same options, same encoding | Same as `eql?` | If other is a String: Match against self
 Array            | Same length, every element `.eql?` corresponding other element | Same length, every element `==` corresponding other element. Will [implicitly convert](/54-try-converting.html) other object via `.to_ary` | -
 Hash             | Same length, every element `==` corresponding other element (order not relevant) | Same as `eql?` | -
 Module           | -      | -    | `other.is_a?(self)`
 Class            | -      | -    | `other.is_a?(self)`
{:.table-13-29-29-X}

Meaning of `-`: Not defined / Use `Object`'s implementation

## Best Practices for Sub Classes

- Define a meaningful `==` which returns `true` if two objects should be considered the same
- Make `eql?` return the same value `==`, but also limit it to return only `true` if both object are instances of the same class
- Don't redefine `equal?`
- Be creative with `===` (On a reasonable level. Other people using your code expect it to be some kind of useful relationship check)

## Also See

- [equalizer: Automatically define `==` and `eql?` based on the object's instance variables](https://github.com/dkubb/equalizer)
