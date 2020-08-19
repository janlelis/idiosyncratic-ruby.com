---
title: Super Snakes
date: 2020-08-17
tags: core
commit: a5268be57200ea7caba0f182de25e4d954df6887
---

Have you ever been confused by the __\_\_underscores\_\___ required by some of __\_\_RUBY\_\___'s features? You can get it right with this overview of all of "super snake" keywords and methods.

ARTICLE

There are three different types of underscore-wrapped syntaxes in the Ruby core language:

- keywords
- **Object** methods and
- **Kernel** methods.

Let us take a look at each of them, and understand the motivations behind. Or directly jump to:

[\_\_FILE\_\_](#file)[\_\_LINE\_\_](#line)[\_\_ENCODING\_\_](#encoding)[\_\_END\_\_](#end)[\_\_method\_\_](#method-and-callee)[\_\_callee\_\_](#method-and-callee)[\_\_dir\_\_](#dir)[\_\_id\_\_](#id)[\_\_send\_\_](#send)

## Keywords (Built into Ruby Syntax)

These are directly translated by the Ruby interpreter: You cannot use meta-programming with these, since they will always return the corresponding value directly:

### \_\_FILE\_\_

Returns the current source file's name. Might be special value for unusual invocations:

Context | Value
--------|-------
File, directly executed | path name, can be relative
File, required / loaded | absolute path
IRB | `"(irb)"`
[eval](https://ruby-doc.org/core/Kernel.html#method-i-eval)'d | `"(eval)"`
`$ ruby -e` | `"-e"`
Standard Input | `"-"`

### \_\_LINE\_\_

Returns the line number in the current source file. Also works in IRB and with code executed with `$ ruby -e`, **STDIN** or `eval`.

### \_\_ENCODING\_\_

Returns the source file's [encoding](https://ruby-doc.org/core/Encoding.html), as specified per [magic comment](/58-magic-instructions.html). The default source file encoding is UTF-8. The important thing to understand is that this value should correspond to the actual encoding of the source file, so to change the source encoding, it is not enough to just change the magic comment, you will also need to convert the source file.

You should also note that this is unrelated to some other global encoding configurations, which serve different purposes:

- [Encoding.default_external](https://ruby-doc.org/core/Encoding.html#class-Encoding-label-External+encoding)
- [Encoding.default_internal](https://ruby-doc.org/core/Encoding.html#class-Encoding-label-Internal+encoding)

### \_\_END\_\_ (at beginning of line)

A special syntax which will end the source file earlier and create [big data](/59-big-data-without-end.html).

## Underscore-Wrapped `Kernel` Methods

These special Kernel methods are lowercased to highlight the fact that they are actually just methods and no built-in keywords.

### \_\_method\_\_ and \_\_callee\_\_

Both return the current method's name, but they differ in a detail: When using a method alias, `__callee__` will return the aliased method name, while `__method__` would return the original name:

    def example!
      p [__method__, __callee__]
    end
    alias test! example!

    example! # => [:example!, :example!]
    test! # => [:example!, :test!]

Two similar and useful methods are [Kernel#caller](https://ruby-doc.org/core/Kernel.html#method-i-caller) and [Kernel#caller_locations](https://ruby-doc.org/core/Kernel.html#method-i-caller_locations), which provide some more context.

### \_\_dir\_\_

Returns `File.dirname(File.realpath(__FILE__))`, which is the absolute path of the directory of the current source file.

While it also works in IRB, it will return `nil` in eval, `$ ruby -e`, and **STDIN** contexts.

## Underscore-Wrapped `BasicObject` Methods

Both of the following methods are so important that every object (even those that inherit from [BasicObject](https://ruby-doc.org/core/BasicObject.html) directly) should have. This is why they got some underscore companions.

### \_\_id\_\_

Returns the object id, just like [Object#object_id](https://ruby-doc.org/core/Object.html#method-i-object_id). It mainly exists for historical reasons, most people use `object_id` nowadays.

### \_\_send\_\_

The `__send__` method is an alias of the [Object#send](https://ruby-doc.org/core/Object.html#method-i-send), which dynamically calls the method given as a symbol argument. Its purpose is that you should still be able to use the *send functionality* in case someone redefines the `send` method. The interpreter will issue a warning¹ should you try to redefine or remove it:

    warning: redefining `__send__' may cause serious problems

Nevertheless, it is probably not a good idea either to redefine non-underscore-wrapped `send`, since a lot of meta-programming relies on it…

¹ This is not true for `__id__` - Ruby will not complain if you choose to redefine it. It will complain for `object_id` though.

## Also See

- [Episode 5: Constant Shadows](/5-constant-shadows.html) (even another way Ruby uses underscores)
- [Episode 19: Symbolic Reservations](/19-semantic-symbols.html) (in certain cases, symbols with underscores can be special)

Many thanks to [Shannon Skipper for pointing out](https://github.com/janlelis/idiosyncratic-ruby.com/commit/a5268be57200ea7caba0f182de25e4d954df6887#commitcomment-41542806) that [the mysterious `SUPPORT_JOKE` compiler option's `__goto__` and `__label__` also make use of underscores](/24-goto-fail.html)