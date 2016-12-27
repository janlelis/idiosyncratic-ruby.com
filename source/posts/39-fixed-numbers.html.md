---
title: Fixed Numbers
date: 2016-05-08
tags: ecosystem, community
commit: 20be10cdba3ed129dbba52950b50042a73f48c25
---

A quick reminder that number literals in Ruby can be pretty fancy!

ARTICLE

Example     | Evaluates To | Class    | Purpose
------------|--------------|----------|--------
`0x10`      | `16`         | [Integer](http://ruby-doc.org/core/Integer.html)     | Integers in hexadecimal (0-16) format
`0o10`¹     | `8`          | [Integer](http://ruby-doc.org/core/Integer.html)     | Integers in octal (0-8) format
`0b10`      | `2`          | [Integer](http://ruby-doc.org/core/Integer.html)     | Integers in binary (0-1) format
`1e1000`    | `Float::INFINITY` | [Float](http://ruby-doc.org/core/Float.html)    | Floats in [exponential notation](https://en.wikipedia.org/wiki/Scientific_notation#E_notation)
`1i`        | `(0+1i)`²    | [Complex](http://ruby-doc.org/core/Complex.html)     | Shorthand for creating complex numbers
`3/6r`      | `(1/2)`²     | [Rational](http://ruby-doc.org/core/Rational.html)   | Shorthand for creating rational numbers
`0_0`       | `0`          | any                                                        | Visually separate digits
{:.table-20-20-15-X}

¹ Also: `010`<br/>
² While the representation of a complex number (e.g. `(0+1i)`) is a valid way to create the same number again, this is not true for `(1/2)` which will just evaluate to `0`³. Also note that the [`r` only makes the `6` a rational](https://github.com/whitequark/parser/issues/287), which in turn "rationalizes" the result. An equivalent way of expressing the same fraction would be `3r/6`<br/>
³ Execpt when you [`require "mathn"`](https://github.com/ruby/ruby/blob/trunk/lib/mathn.rb)