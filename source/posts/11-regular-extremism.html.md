---
title: Regular Extremism
date: 2015-05-11
tags: strings, rexex
commit: 2ac97dd2eac279a8c4fc2355004e141cb15406a9
---

You are here for a collection of 10 advanced features of regular expressions in Ruby!

ARTICLE

## Regex Conditionals

Regular expressions can have embedded conditionals (*if-then-else*) with `(?ref)then|else`. "ref" stands for a group reference (number or name of a capture group):

    # will match everything if string contains "ä", or only match first two chars
    regex = /(?=(.*ä))?(?(1).*|..)/

    "Ruby"[regex] #=> "Ru"
    "Idiosyncrätic"[regex] #=> "Idiosyncrätic"

## Keep Expressions

The possible ways to [look around](http://www.regular-expressions.info/lookaround.html) within a regex are:

 Syntax  | Description         | Example
---------|---------------------|-------------------------------
`(?=X)`  | Positive lookahead  | `"Ruby"[/.(?=b)/]    #=> "u"`
`(?!X)`  | Negative lookahead  | `"Ruby"[/.(?!u)/]    #=> "u"`
`(?<=X)` | Positive lookbehind | `"Ruby"[/(?<=u)./]   #=> "b"`
`(?<!X)` | Negative lookbehind | `"Ruby"[/(?<!R|^)./] #=> "b"`

But Ruby also has "Keep Expressions", an additional shortcut syntax to do *positive lookbehinds* using `\K`:

    "Ruby"[/Ru\Kby/] #=> "by"
    "Ruby"[/ru\Kby/] #=> nil

## Character Class Intersections

You can nest character classes and AND-connect them with `&&`. Matching all non-vowels here:

    "Idiosyncratic".scan /[[a-z]&&[^aeiou]]+/
    # => ["d", "syncr", "t", "c"]

## Regex Sub-Expressions

You can recursively apply regex groups again with `\g<ref>`. "ref" stands for a group reference (number or name of a capture group). This is different from back-references (`\1` .. `\9`), which will re-match the already matched string, instead of executing the regex again:

    # match any number of sequences of 3 identical chars
    regex = /((.)\2{2})\g<1>*/
    "aaa"[regex] #=> "aaa"
    "abc"[regex] #=> nil
    "aaab"[regex] #=> "aaa"
    "aaabbb"[regex] #=> "aaabbb"
    "aaabbbc"[regex] #=> "aaabbb"
    "aaabbbccc"[regex] #=> "aaabbbccc"

## Match Characters that Belong Together

`\X` treats combined characters as a single character. See [grapheme clusters](http://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) for more information.

    string = "R\u{030A}uby"
    string[/./] #=> "R"
    string[/.../] #=> "R̊u"
    string[/\X\X/] #=> "R̊u"

## Relative Back-References

Back-refs can be relatively referenced from the current position via `\k<-n>`:

    "Ruby by"[/(R)(u)(by) \k<-1>/] #=> "Ruby by"


## Deactivate Backtracking

[Atomic groups](http://www.regular-expressions.info/atomic.html), defined via `(?>X)`, will always try to match the first of all alternatives:

    "Rüby"[/R(u*|ü)by/]   #=> "Rüby"
    "Rüby"[/R(?>u*|ü)by/] #=> nil

## Turn On Unicode-Matching for `\w`, `\d`, `\s`, and `\b`

    "Rüby"[/\w*/] #=> "R"
    "Rüby"[/(?u)\w*/] #=> "Rüby"

## Continue Matching at Last Match Position

When using a method that matches a regex multiple times against a string (like `String#gsub` or `String#scan`), you can reference the position of the last match via `\G`:

    "abc1abc22abc333".scan /\Gabc./ # => ["abc1", "abc2"]

## `String#split` with Capture Groups

The normal way of using `String#split` is this:

    "0-0".split(/-/) #=> ["0", "0"]

But if you want to make your code as hard to read as possible, remember that captured groups will be added to the resulting array:

    "0-0".split(/(-)/) #=> ["0", "-", "0"]
    "0-0".split(/-(?=(.))/) #=> ["0", "0", "0"]
    "0-0".split(/(((-)))/) #=> ["0", "-", "-", "-", "0"]

## Resources

- [RDoc: Regexp](http://ruby-doc.org/core-2.3.0/Regexp.html)
- [Onigmo Documentation](https://github.com/k-takata/Onigmo/blob/master/doc/RE)
