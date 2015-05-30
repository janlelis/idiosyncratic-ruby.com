---
title: Regex with Class
date: 2015-05-30
tags: regex, strings, encoding
commit: 09d6cbfd1ca438d9999a6587d8c36b7fc3a120dc
---

Ruby's regex engine defines a lot of shortcut character classes. Besides the common meta characters (`\w`, etc.), there is also the [POSIX style expressions](http://www.regular-expressions.info/posix.html) and the [unicode property](https://en.wikipedia.org/wiki/Unicode_character_property) syntax.

ARTICLE

This is the first part of an overview:

## Meta Chars

Char           | Negation       | ASCII Matches   | Unicode Matches
---------------|----------------|-----------------|---------------------
`.`            | -              | ¹ Any           | ¹ Any
`\d`           | `\D`           | `[0-9]`         | ² Also: `０`..`９` `𝟎`..`𝟗` `𝟘`.. `𝟡` `𝟢`..`𝟫` `𝟬`..`𝟵` `𝟶`..`𝟿`
`\h`           | `\H`           | `[0-9a-fA-F]`   | Same
`\w`           | `\W`           | `[0-9a-zA-Z_]`  | ² Letters, Marks, and Numbers
`\s`           | `\S`           | `[ \t\r\v\n\f]` | ² Also: `\u1680` `\u2000`..`\u200A` `\u2028` `\u2029` `\u202F` `\u205F` `\u3000`
`\R`           | -              | `\r\n` or `[\n\v\f\r]` | Also : `\u0085` `\u2028` `\u2029`
`\X`           | -              | Any             | ³ `\P{M}\p{M}*`
{:.table-15-15-30-X}

¹ Will only match linebreaks with `/m` flag<br>
² You need to [manually turn on unicode matching](http://idiosyncratic-ruby.com/11-regular-extremism.html#turn-on-unicode-matching-for-w-d-s-and-b) for these to work<br>
³ See [grapheme clusters](http://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)

## POSIX / Unicode Property Style

There are a lot of more possibilities to match for specific characters. See [the Regexp documentation](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Character+Properties) for more details! (or come back soon)