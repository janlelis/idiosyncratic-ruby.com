---
title: Assignments In-Style
date: 2020-08-04
tags: core, syntax
commit: 2bc0ab6325415a4bad09caeea2c6398f09c95150
---

The introduction of *pattern matching* in Ruby 2.7 brought us a new style of multi-assigning local variables: The **pattern assignment**, or, how you could also call it, the **assignment in-style**.

ARTICLE

After you have [deactivated the warnings for experimental features](/67-warning-the-experiment.html), try the following piece of code:

    [1, 2, 3, 4] in [first, second, *other]

**Think:** Put `[1, 2, 3, 4]` into `[first, second, *other]`

    first # => 1
    second # => 2
    other # => [3,4]

This is a great addition to the [previous two and a half ways of assigning local variables](/14-meeting-some-locals.html). Let's see some more examples, starting with the most basic one:

    0 in a # => nil
    a # => 0

When assigning multiple values, be sure to supply exactly the number of expected values:

    cities = %w[Berlin Potsdam Magdeburg]
    cities in [a,b] # NoMatchingPatternError
    cities in [x,y,z]
    x #=> Berlin
    y #=> Potsdam
    z #=> Magdeburg

If your array is of unknown length, use an asterisk, like in the introductory example.

Pattern assignments also have type checks built in:

    cities = %w[Berlin Potsdam Magdeburg]
    cities in [Integer => c_1, *c_other] # NoMatchingPatternError
    cities in [String => c_1, *c_other]
    c_other # => ["Potsdam", "Magdeburg"]

Which, of course, also work for single assignments:

    0 in Float => a # NoMatchingPatternError
    0 in Integer => a

Since hashes are also supported, we can finally have JavaScript-like object destructuring¹:

    {
      verb: "CREATE",
      endpoint: "/syntax",
      authed: true,
    } in { verb:, endpoint: }

    verb #=> "CREATE"
    endpoint #=> "/syntax"

¹ Differently from arrays, there is no need to specify all hash keys of the given hash object

## Also See

- [More examples and info at the Idiosyncratic Ruby Quiz 2020](/quiz/2020/january/#/1)
- [Pattern matching explained by its author](https://speakerdeck.com/k_tsj/pattern-matching-new-feature-in-ruby-2-dot-7)
- [Pattern matching documented at the Ruby Reference](https://rubyreferences.github.io/rubyref/language/pattern-matching.html)