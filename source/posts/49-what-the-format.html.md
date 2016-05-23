---
title: What the Format?
date: 2016-05-18
tags: core, format, string, sprintf
commit: a9f9e2f73c1f55604f650ce63030458e3dc968e6
---

Ruby comes with a structured alternative to classic string interpolation: This episode will explore **format strings**, also known as the *sprintf* syntax.

ARTICLE

Recall the normal way of interpolating variables into a string:

    v = 42
    "--> #{v} <--"
    # => "--> 42 <--"

Format strings are different in that they use a string template and bind it to data via the `%` method:¹

    v = 42
    "--> %s <--" % v
    # => "--> 42 <--"

This might look familiar to you, because [dozens of other programming languages](https://en.wikipedia.org/wiki/Printf_format_string) also support some flavor of this syntax.

¹ Some people prefer the functional-style *Kernel#sprintf* or *Kernel#format* methods, which let you access the same functionality

## Four Kinds of References

Format strings separate the string's format (= template) from the actual data. The template contains references in the format of `%X` (unnamed) or `%<name>X` (named). The `X` consists of the formatting type, optionally preceded by other formatting options (see next section). The most basic formatting type is `%s`, which stands for *string*. You cannot mix between the two referencing styles; either go with named or unnamed:

    # Named format strings take a hash parameter:
    "--> %<forty_two>s -- %<forty_three>s <--" % {forty_two: 42, forty_three: 43}
    # => --> 42 -- 43 <--

    # Named format strings, fancy style (note the dot before `%`):
    "--> %<forty_two>s -- %<forty_three>s <--".% forty_two: 42, forty_three: 43
    # => --> 42 -- 43 <--

    # Shorter, simple/unnamed format strings, take an array as parameter:
    "--> %s -- %s <--" % [42, 43]
    # => --> 42 -- 43 <--

    # If you only need to interpolate a single value, you can shorten this to:
    "--> %s <--" % 42
    # => --> 42 <--

    # Attempt to mix:
    "--> %s -- %<second>s <--" % [1, second: 2]
    # ArgumentError: named<second> after unnumbered(1)

Conceptionally, this is very similar to how regular expresions handle references. For simple interpolations use simple references, for more complex interpolations named references might be a better fit. Named references serve as inline documentation.

### Referencing: Template Style

Besides the two main styles, there exists a shorthand syntax for using format strings with named references:

    "--> %{first} -- %{second} <--".% first: 1, second: 2
    # => --> 1 -- 2 <--

Though you will use the ability to apply a formatting type (see below), it is concise and looks good. At its core, it is templating built into the language!

### Referencing: Absolute Positioning

The fourth way of referencing the values is the most unreadable one and I would not recommend it. It is a modification of the unnamed reference style: Instead of using the variables in the order you passed them in, you denote the position of the value in the template string using `n$`:

    "--> %2$s -- %1$s <--" % [:first, :second]
    # => "--> second -- first <--"

Again, mixing with other types of referencing will lead to errors like this one:

    "--> %2$s -- %s <--" % [:first, :second]
    # ArgumentError: unnumbered(1) mixed with numbered

## Flags, Widths, and Formatting Type

In the previous examples, only basic string substitution was used. But format strings can do more: They can convert a value to another representation using a different **formatting type**. The formatting type is specified by the last letter of the reference. Besides `%s`, another common used formatting type is `%d`, which will put the value through [`Interger()`](http://ruby-doc.org/core-2.3.1/Kernel.html#method-i-Integer):

    "%d" % 1
    # => 1

    "%d" % "1"
    # => 1

    "%d" % "string without integer value"
    # ArgumentError: invalid value for Integer(): "string without integer value"

There are three different kinds of formatting types: Format as `String`, format as `Integer`, and format as `Float`. See further below for a detailed description. Often, the formatting can be enhanced with special flags or widths. Special options appear between the `%` sign and the formatting type². For example:

    "%.2f" % 1.23456 # => 1.23

This is a float conversion, and the special option "precision of 2" was used. Different formatting types support different kinds of flags and options. The complete syntax of a reference is:

`%<name>AB.CX`

Syntax  | Notes  | Required/Optional
--------|-----------------|---------
`%`     | -³              | Required
`<name>`| Named reference | Optional
*A*     | Flags           | Optional
*B*     | Width           | Optional
`.` *C* | Precision       | Optional
*X*     | Formatting type | Required

² As [fnordfish noted](https://twitter.com/fnordfish/status/732957226932047877), the syntax can sometimes be quite confusing, such as in:<br/>`"Such %<num> cookies" % { num: 100 }`<br/>
³ Since the `%` character denotes a reference, you have to use `%%` to get a single "%"


What follows is a description of all formatting options and types.

## Formatting Flags and Options: String Padding

When the format string parser finds a number (which is not a preceeded by `.` or `$`), it will treat the value as a padding width. The padding width defines the minimum string length, the remaining space will be filled with ASCII spaces. This is a similar functionality like provided by [String#ljust](http://ruby-doc.org/core-2.3.1/String.html):

    "%20s" % "Idiosyncratic"
    # => "       Idiosyncratic"

It also works with template-style references:

    "%20{ruby}".% ruby: "Idiosyncratic"
    #=> "       Idiosyncratic"

### - | Minus

You can use "negative widths" to right-pad a string:

    "%-20s" % "Idiosyncratic"
    # => "Idiosyncratic       "

### * | Star

A dynamic padding width can be achieved with `*`. This will require two arguments and does not work with named references:

    w = 20
    "%*s" % [w, "Idiosyncratic"] # => "       Idiosyncratic"

**Note:** Alternatively, you can just inline-interpolate the format string:

    w = 20
    "%#{w}s" % "Idiosyncratic" # => "       Idiosyncratic"

Can be combined with absolute positioned references (e.g. `"%1$*2$s"`).

### 0 | Zero

The `0` as flag allows you to pad numerical values with zeros instead of spaces:

    "%020i" % 1
    # => #=> "00000000000000000001"

Will not work for `%s`, `%p`, or `%c`. Can also not be combined with the `-` flag (right-pad).

## Formatting Flags and Options: Algebraic Sign

### + | Plus

The `+` flag forces a "+" sign for positive numbers:

    "%+d" % 1
    # => "+1"

    "%+d" % -1
    # => "-1"

Will not work for `%s`, `%p`, or `%c`.

### ⍽ | Space

In a similar manner, the <code> </code> flag, forces positive numbers to leave a space (for a potential "-" sign):

    "% d" % 1
    # => " 1"

    "% d" % -1
    # => "-1"

Will not work for `%s`, `%p`, or `%c`.

## Other Formatting Flags and Options

### \# | Hash

Modifies the way a numerical value gets converted. What it exactly does varies, so see the description at respective formatting type!

## Formatting Types: String

### %s | String

Does nothing but putting the string argument at the right position.

    "%s Ruby" % "Idiosyncratic"
    # => "Idiosyncratic Ruby"

Will call `to_s` on the object passed in.

    "%s Ruby" % :Idiosyncratic
    # => "Idiosyncratic Ruby"

A padding example:

    "%4s" % "A"
    # => "   A"

Using the precision syntax, you can pass a hard length limit:

    "%.4s" % "Idiosyncratic"
    # => "Idio"

Padding + Limit:

    "%4.8s" % "12"
    # => "  12"

    "%4.8s" % "1234567890"
    # => "12345678"

### %p | Inspect

Calls [inspect](http://ruby-doc.org/core-2.3.1/Kernel.html#method-i-p) on the value:

    "%p" % "Idiosyncratic"
    # => "\"Idiosyncratic\""

Supports the same flags and arguments like `%s`.

### %c | Character

Interpretes a numerical value as a [codepoint](https://en.wikipedia.org/wiki/Code_point) of the current encoding and converts it to the respective character (the reverse of [String#ord](http://ruby-doc.org/core-2.3.1/String.html#method-i-ord), similar to what [`Array#pack("U")`]((http://idiosyncratic-ruby.com/4-what-the-pack.html#u--utf-8-characters)) does for UTF-8 strings):

    "%c" % 11835
    # => "⸻"

Can also be used with a single letter string, which will just be inserted (as if was used with `%s`):

    "%c" % "A"
    # => "A"

## Formatting Types: Integer

A padding width has the same effect it has for strings. When Integer formatting is used together with a precision it will act as the minimum number of digits to display (which is different from the effect it has in Float formatting):

    "%6.4d" % 20
    # => "  0020"

The all integer formatting type will run the value through [`Integer()`](http://ruby-doc.org/core-2.3.1/Kernel.html#method-i-Integer):

    "%d" % 42.9
    # => "42"

    "%d" % "23"
    # => "23"

    "%d" % "0xff"
    # => "255"

    "%d" % nil
    # TypeError: can't convert nil into Integer


### %d, %i, %u | Integer (Decimal Number)

`%d`, `%i` and `%u` all convert the value to an integer (see explanation above):

    "%d" % "123"
    # => 123

### %b, %B | Binary Number

Converts the number to a binary number string:

    "%b" % 42
    # => "101010"

**Note:** Another way of achieving the same would be to use [Numeric#to_s(2)](http://ruby-doc.org/core-2.3.1/Numeric.html):

    42.to_s(2)
    # => "101010"

Negative numbers will be convert to [two's complement](https://en.wikipedia.org/wiki/Two's_complement), preceeded by "..1" representing an infinite string of leading "1"s:

    "%b" % -42
    # => "..1010110"

This is not the case when the `+` or <code> </code> flag are in use:

    "%+b" % -42
    # => "-101010"

Alternative conversion format (`#` flag) will prepend "0b" (except for 0):

    "%#b" % 42
    # => "0b101010"

The `%B` type has exactly the same behavior as `%b`, except that it will use an uppercase "B" in alternative conversion format:

    "%#B" % 42
    # => "0B101010"

### %o | Octal Number

Converts the number to an octal number string:

    "%o" % 42
    # => "52"

**Note:** Another way of achieving the same would be to use [Numeric#to_s(8)](http://ruby-doc.org/core-2.3.1/Numeric.html):

    42.to_s(8)
    # => "52"

Negative numbers will be convert to [two's complement](https://en.wikipedia.org/wiki/Two's_complement), preceeded by "..7" representing an infinite string of leading "7"s:

    "%o" % -42
    # => "..726"

This is not the case when the `+` or <code> </code> flag are in use:

    "%+o" % -42
    # => "-52"

Alternative conversion format (`#` flag) will prepend "0" (except for 0):

    "%#o" % 42
    # => "052"

### %x, %X | Hexadecimal Number

Converts the number to a hexadecimal number string:

    "%x" % 42
    # => "2a"

The `%X` type has the same behavoir, except that it will used uppercased letters:

    "%X" % 42
    # => "2A"

**Note:** Another way of achieving the same would be to use [Numeric#to_s(16)](http://ruby-doc.org/core-2.3.1/Numeric.html):

    42.to_s(16)
    # => "2a"

Negative numbers will be convert to [two's complement](https://en.wikipedia.org/wiki/Two's_complement), preceeded by "..f" representing an infinite string of leading "f"s:

    "%x" % -42
    # => "..fd6"

This is not the case when the `+` or <code> </code> flag are in use:

    "%+x" % -42
    # => "-2a"

Alternative conversion format (`#` flag) will prepend "0x" (except for 0):

    "%#x" % 42
    # => "0x2a"

Or "0X" when using big `%X`:

    "%#X" % 42
    # => "0X2A"

## Formatting Types: Float

### %f | Float

This will convert the argument to a floating point number:

    "%f" % 42
    # => "42.000000"

The precision syntax defines the actual precision here:

    "%.2f" % 42
    # => "42.00"

    "%.3f" % 42
    # => "42.000"

### %e, %E | Float in Exponential Notation

Converts the value to a float in [exponential notation](https://en.wikipedia.org/wiki/Scientific_notation) (with 6 digits before the exponent):

    "%e" % 42
    # => "4.200000e+01"

    "%e" % 0.00000023
    # => "2.300000e-07"

    "%e" % -1_000_000_000
    # => "-1.000000e+09"

The precision syntax defines the number of digits before the exponent:

    "%.2e" % 42
    #=> "4.20e+01"

    "%.4e" % 42
    # => "4.2000e+01"

Using big `%E` will uppercase the "E" in the result:

    "%E" % 1
    # => "1.000000E+00"

### %g, %G | Float in Normal or Exponential Notation

Converts a float either to normal representation `1.23` or exponential notation (see `%e` above). Which one is chosen, depends on the number: If the exponent is more than 5 or less than -4, exponential format is used:


    >> "%g" % 100000
    # => "100000"

    >> "%g" % 1000000
    # => "1e+06"

    >> "%g" % 0.0001
    # => "0.0001"

    >> "%g" % 0.00001
    # => "1e-05"

Will use a given (positive) precision as the point to decide between both notation forms:

    "%.2g" % 10
    # => "10"

    "%.2g" % 100
    # => "1e+02"

Using big `%G` will uppercase the "E" in the result:

    "%G" % 1234567890
    # => "1.23457E+09"

### %a, %A | Analyze Float

Converts a float into a format revealing its underlying representation, which is devided into [significand (mantissa) and exponent](https://en.wikipedia.org/wiki/Floating_point). The result is a string of the following format:

`-` (if negative) + `0x` + significand (hexadecimal) + `p` + exponent sign + exponent (decimal)

Examples:

    "%a" % 1
    # => "0x1p+0"

    "%a" % 1.2
    # => "0x1.3333333333333p+0"

    "%a" % 1.23
    # => "0x1.3ae147ae147aep+0"

    "%a" % 0.1
    # => "0x1.999999999999ap-4"

    "%a" % 10000000000
    # => "0x1.2a05f2p+33"

    "%a" % 0.000000001
    # => "0x1.12e0be826d695p-30"

Using big `%A` will uppercase all letters:

    "%A" % -12.34
    # => "-0X1.8AE147AE147AEP+3"

## Classic Interpolation vs. Format Strings

### Advantages of Format Strings

- Values sit side by side, instead of being all around the place
- Simple access to string padding functionality
- Advanced (and explicit) numerical conversions
- Can be used as built-in mini templating engine

### Advantages of Classical Interpolation

- Interpolation happens on syntax level, no method calling involved
- Inline interpolation quicker to write/more convenient for simple interpolations
- Not possible to mismatch values and format string references

## Resources

- [RDoc: Kernel#sprintf](http://ruby-doc.org/core-2.3.1/Kernel.html#method-i-sprintf)
- [Source: sprintf.c](https://github.com/ruby/ruby/blob/trunk/sprintf.c)
