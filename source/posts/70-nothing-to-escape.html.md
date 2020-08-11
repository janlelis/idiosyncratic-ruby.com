---
title: Nothing to Escape
date: 2020-08-10
tags: strings, syntax, escape
commit: 0698caf6b5b0c67404d664eed10f68e58002bcf8
---

What is your wild guess: How many different ways does Ruby provide for inserting a **NULL** byte into a double-quoted string?

ARTICLE

There are exactly **43** options¹! Here is the list, put together with some ideas from [Episode 61: Meta Escape Control](/61-meta-escape-control.html):

-------------------|---------------------------
 Directly embedded NULL byte |  # => "\u0000"
 **"\0"**          |            # => "\u0000"
 **"\x00"**        |            # => "\u0000"
 **"\x0"**         |            # => "\u0000"
 **"\u0000"**      |            # => "\u0000"
 **"\u{0000}"**    |            # => "\u0000"
 **"\u{000}"**     |            # => "\u0000"
 **"\u{00}"**      |            # => "\u0000"
 **"\u{0}"**       |            # => "\u0000"
 **"\u{00000}"**   |            # => "\u0000"
 **"\u{000000}"**  |            # => "\u0000"
 **"\000"**        |            # => "\u0000"
 **"\00"**         |            # => "\u0000"
 **"\C-\0"**       |            # => "\u0000"
 **"\C-\x00"**     |            # => "\u0000"
 **"\C-\x0"**      |            # => "\u0000"
 **"\C-\000"**     |            # => "\u0000"
 **"\C-\00"**      |            # => "\u0000"
 **"\C-@"**        |            # => "\u0000"
 **"\C-\x40"**     |            # => "\u0000"
 **"\C-\100"**     |            # => "\u0000"
 **"\C-&#96;"**       |            # => "\u0000"
 **"\C-\x60"**     |            # => "\u0000"
 **"\C-\140"**     |            # => "\u0000"
 **"\C- "**        |            # => "\u0000"
 **"\C-\s"**       |            # => "\u0000"
 **"\C-\x20"**     |            # => "\u0000"
 **"\C-\40"**      |            # => "\u0000"
 **"\c\0"**        |            # => "\u0000"
 **"\c\x00"**      |            # => "\u0000"
 **"\c\x0"**       |            # => "\u0000"
 **"\c\000"**      |            # => "\u0000"
 **"\c\00"**       |            # => "\u0000"
 **"\c@"**         |            # => "\u0000"
 **"\c\x40"**      |            # => "\u0000"
 **"\c\100"**      |            # => "\u0000"
 **"\c&#96;"**        |            # => "\u0000"
 **"\c\x60"**      |            # => "\u0000"
 **"\c\140"**      |            # => "\u0000"
 **"\c "**         |            # => "\u0000"
 **"\c\s"**        |            # => "\u0000"
 **"\c\x20"**      |            # => "\u0000"
 **"\c\40"**       |            # => "\u0000"
{:.table-huge-font}

¹ And this is just in the context of double-width strings without interpolation: Another fun NULL byte is `0.chr`, [as noted by @cremno](https://github.com/janlelis/idiosyncratic-ruby.com/commit/0698caf6b5b0c67404d664eed10f68e58002bcf8#commitcomment-41344279)

## Also See

- [Meta Escape Control](/61-meta-escape-control.html)
- [210 Ways to Rome](/15-207-ways-to-rome.html)