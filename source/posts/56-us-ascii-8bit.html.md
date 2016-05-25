---
title: US-ASCII-8BIT
date: 2016-05-26
tags: string, encoding, ascii
commit: a5cb71a503b730ac5e901de4d91154b27f116613
---

How comes that Ruby has two [ASCII](https://en.wikipedia.org/wiki/ASCII) encodings?

ARTICLE

    Encoding.name_list.grep(/ASCII/)
    # => ["ASCII-8BIT", "US-ASCII"]

Which one is the *normal* one you should use for ASCII?

## Aliases

 ASCII-8BIT | US-ASCII
------------|----------
 BINARY     | ASCII
            | ANSI_X3.4-1968
            | 646

So, **US-ASCII** is aliased to **ASCII**, but then what is **ASCII-8BIT** for? [Encodings' RDoc](http://ruby-doc.org/core-2.3.1/Encoding.html) has some help:

    Encoding::ASCII_8BIT is a special encoding that is usually
    used for a byte string, not a character string. But as the name insists,
    its characters in the range of ASCII are considered as ASCII characters.
    This is useful when you use ASCII-8BIT characters with other ASCII
    compatible characters.

So basically, it is not a real encoding, but represents an arbitrary stream of bytes (bytes with a value between 0 and 255). It is used for raw byte stream or if you want to make clear that you do not know about a string's encoding!

The ASCII charset only takes 7 bytes, so in strict ASCII, the 8th byte should never be set. The allowed byte value range is from 0 to 127. This is what the **US-ASCII** encoding is all about: It is used when dealing with ASCII encoded strings. Think: **"ASCII-7BIT"**

A simple example illustrating the difference:

     out_of_ascii_range = 128.chr # => "\x80"
     out_of_ascii_range.force_encoding("US-ASCII").valid_encoding? # => false
     out_of_ascii_range.force_encoding("ASCII-8BIT").valid_encoding? # => true