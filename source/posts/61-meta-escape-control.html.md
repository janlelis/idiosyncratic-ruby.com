---
title: Meta Escape Control
date: 2016-05-30
tags: strings, syntax, escape
---

Double-quoted strings can not only be used with interpolation, `#{}`, they also support various escape sequences, which are initiated with `\`. Escape sequences allow you to embed raw byte and codepoint values. Furthermore, there are shortcuts for common formatting and control characters.

ARTICLE

## Byte Sequences

There are two basic ways in which you can specify raw bytes to embed: `\x00` (hexadecimal) or `\000` (octal):

    "\x20" # => " " # space
    "\xab" # => "\xAB" # byte value 171
    "\033" # => "\e" # escape
    "\0"   # => "\u0000" # null byte

### Meta Escapes

There is a *meta escape* syntax `"\M-x"` with **x** being a byte value. If the byte is below 128 (`\x80`), it will add 128, otherwise it will return the same value. Differently put: It will return the same byte value with 8th bit set. The **x** value can be escaped again:

    "A".unpack("C")    # => [65]
    "\M-A".unpack("C") # => [193]
    "\M-\x01" # => "\x81"
    "\M-\x81" # => "\x81"

### Control Escapes

Another legacy syntax is the *control escape* syntax: `"\C-x"` (or `"\cx"`)  with **x** being a byte value. It will return the value of the 5 least significant bits, so the value will also between 0 and 31. The **x** value can be escaped again, or combined with *meta escapes*:

    "\C-\x01" # => "\u0001"
    "\C-!"    # => "\u0001"
    "\C-A"    # => "\u0001"
    "\M-\C-A" # => "\x81"
    "\C-\M-A" # => "\x81"

## Unicode Codepoints

Unicode characters are represented by codepoint values. If you know the numerical codepoint value, you can embed it in a double-quoted string using `\u`. You must use exactly 4 digits of the hexadecimal representation of the value, but casing is not relevant:

    "\u0020" # => " " # space
    "\u00A0" # => " " # no-break space
    "\u203d" # => "‽" # interrobang

The `\u` syntax supports a more explicit `{}` flavor:

    "\u{9}" # => "\t" # tab
    "\u{2602}" # => "☂" # umbrella

The `\u{}` syntax is required if you want to display codepoints which need more than four hexadecimal digest, for example, [`U+1F6A1 AERIAL TRAMWAY`](https://codepoints.net/U+1F6A1):

    "\u{1F6A1}" # "🚡"

It also allows you to specifiy multiple characters at once:

    "\u{49 64 69 6f 73 79 6e 63 72 e4 74 69 63 20 52 75 62 79}"
    # => "Idiosyncrätic Ruby"

## Control and Formatting Characters

Some byte values used for common control/formatting characters have escape sequences:

Escape | Byte Value | Description
-------|------------|------------
`\a`   | 7          | terminal bell
`\b`   | 8          | backspace
`\t`   | 9          | tab
`\n`   | 10         | newline
`\v`   | 11         | vertical tab
`\f`   | 12         | form feed
`\r`   | 13         | carriage return
`\e`   | 27         | start [escape sequence](https://en.wikipedia.org/wiki/ANSI_escape_code)
`\s`   | 32         | ` ` (space)
