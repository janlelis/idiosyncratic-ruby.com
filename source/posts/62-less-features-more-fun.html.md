---
title: Less Feature-Rich, More Fun
date: 2016-05-31
tags: syntax, grammar, keywords
commit: 3b9d255870669d87b7eee74f595e03b4f0d11de9
---

Ruby was created in 1993 and has come a long way. The preferred style of coding has changed quite a lot and solid best practice has emerged (though, as always, [one size does not fit all](http://relaxed.ruby.style/)). At the same time, [Ruby's tool support could be better](/1-test-highlights.html), the language is still too complex. Maybe, the time has come to remove some features from Ruby.

ARTICLE

Which is always hard, because it will break existing code.¹ But it can still be worth it:

- People new to Ruby start with learning the *right thing*, instead of having to learnthe best practice later ("avoid for loops")
- The language gets simpler, which means: better tool support!

What follows are some opinionated examples of what could be removed from Ruby without breaking too much code (hopefully).

## Ten Ruby Features which Could Be Removed Without Too Much Trouble (More or Less)

### 1. `for` and `in` Keywords

For loops are rarely used in favor of semantically almost similar alternatives like [Array#each](https://ruby-doc.org/core/Array.html#method-i-each) or [Integer#times](https://ruby-doc.org/core/Integer.html#method-i-times). They are even [a little slower than calling `each` directly](https://github.com/JuanitoFatas/fast-ruby#enumerableeach-vs-for-loop-code). Also see: [The Evils of the For Loop](http://graysoftinc.com/early-steps/the-evils-of-the-for-loop)

### 2. `?` Character Literals

The [question mark allows you to create single-letter strings](/33-too-expressive.html#question-mark-4-syntactical-meanings). This was indeed useful when writing code that should work for both, Ruby 1.8 and Ruby 1.9:

    "Idiosyncratic"[0] == ?I

While the return value in Ruby 1.9+ is `"I"` on both sides, in Ruby 1.8 it was `73` on both sides, so it would still return `true`. Support for Ruby 1.8 ended in 2013, so there is no benefit of the `?` syntax anymore.

### 3. `@@` Class Hierarchy Variables

[You should not use class variables!](http://makandracards.com/makandra/14229-the-many-gotchas-of-ruby-class-variables) They will confuse almost every newcomer and should be removed from the language. Some alternatives:

- Class-instance variables
- [ActiveSupport's class attributes](http://guides.rubyonrails.org/active_support_core_extensions.html#class-attributes)
- [Hanami's class attributes](https://github.com/hanami/utils/blob/master/lib/hanami/utils/class_attribute.rb)

To be fair: Removing class variables would break more code than any of the other suggestions on this page. Too big to remove.

### 4. `then` Keyword

If statements usually separate the condition from the body using a newline or `;`:

    if true
      p 42
    else
      p 43
    end

However, you can optionally use the `then` keyword:

    if true then
      p 42
    else
      p 43
    end

There exist two case where `then` makes sense. One is one-liners:

    if true then p 42 else p 43 end

But even they look better with the ternary operator (`?:`)

    p true ? 42 : 43

The other is single-line `when` statements:

    case
    when true  then 42
    when false then 43
    end

Going with `;`, it would still be possible to write single-line `when`s without `then`:

    case
    when true;  42
    when false; 43
    end

All in all: `then` is superfluous.

### 5. `TRUE`, `FALSE`, `NIL` constants

There are keywords for `true`, `false`, and `nil`. They all have a predefined associated constant, [which can be redefined](/45-constant-shuffle.html): `TRUE, FALSE, NIL = nil, true, false`. There is no reason to keep them around.

**Update:** Removed in Ruby 3.0

### 6. Implicit Creation of Local Variables via Regex Matching

Accessing the last regex match: There is no need for [`=~` to be able to create local variables](/14-meeting-some-locals.html#implicit-local-variables-through-regex-matching), but only if both operands are in the right order. Using [`$~[:group_name]`](https://idiosyncratic-ruby.com/60-escape-back-referencing.html) instead is more explicit and still very concise.

### 7. `and`, `or`, `not` Keywords

The boolean operators with lower precedence are nice in some situations, for example, using `or` to raise an exception when an assignment value is `nil`:

    a = dangerous_operation or raise "dangerous operation failed"

But is it a strong enough reason to keep the keywords in the language? They already have created lots of confusion for Ruby learners.

### 8. Secret CLI Options like `-s` and `-x`

When is the last time you used [`$ ruby -s`](/7-easier-switching.html) or [`$ ruby -x`](/22-literate-ruby.html)?

### 9. Symbols

Semantically, symbols and frozen strings are very similar. [Symbols should become a shorthand syntax for frozen strings!](https://speakerdeck.com/sferik/symbols)

### 10. Flip Flops

This blog covers a lot of Ruby's lesser-known features. It does not even have an episode about [Ruby's Flip Flops](https://www.google.com/search?tbm=isch&q=ruby%20flip%20flops).

¹ Maybe, we can have strict/quirks modes via a [magic comments](/58-magic-instructions.html)? More complexity, though.
