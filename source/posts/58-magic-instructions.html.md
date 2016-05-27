---
title: Magic Instructions
date: 2016-05-27
tags: core, encoding, magic, comment
---

Ruby supports **magic comments** (interpreter instructions) at the top of the source file, mostly known for setting a source files' [Encoding](http://ruby-doc.org/core-2.3.1/Encoding.html). This is the most common use case, but there is more you can do.

ARTICLE

## Source File Encoding

The default encoding of string literals in a Ruby file is UTF-8:

    p "".encoding # => #<Encoding:UTF-8>

You can change it like this

    # encoding: big5
    p "".encoding # => #<Encoding:Big5>

The magic comment parser is pretty liberal and supports various syntaxes:

    # Characters before encoding: ascii or after it will not affect its functionality
    p "".encoding # => #<Encoding:US-ASCII>¹

You can mix casing in the encoding name:

    # encOding: bInary
    p "".encoding # => #<Encoding:ASCII-8BIT>¹

The word *coding*² is allowed instead of *encoding*:

    # -*- coding: utf-8 -*-
    p "".encoding # => #<Encoding:UTF-8>

However, the source encoding must be ASCII compatible:

    # encoding: utf-16le
    p "".encoding
    # UTF-16LE is not ASCII compatible (ArgumentError)

It will also work if you have a [UNIX Shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) in the first line:

    #!/usr/bin/env ruby
    # encoding: windows-1250
    p "".encoding # => #<Encoding:Windows-1250>

The encoding can be any you could pass to [Encoding.find](http://ruby-doc.org/core-2.3.1/Encoding.html#method-c-find):

    Encoding.name_list # => ["ASCII-8BIT", "UTF-8", "US-ASCII", "UTF-16BE", "UTF-16LE", "UTF-32BE", "UTF-32LE", "UTF-16", "UTF-32", "UTF8-MAC", "EUC-JP", "Windows-31J", "Big5", "Big5-HKSCS", "Big5-UAO", "CP949", "Emacs-Mule", "EUC-KR", "EUC-TW", "GB2312", "GB18030", "GBK", "ISO-8859-1", "ISO-8859-2", "ISO-8859-3", "ISO-8859-4", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-9", "ISO-8859-10", "ISO-8859-11", "ISO-8859-13", "ISO-8859-14", "ISO-8859-15", "ISO-8859-16", "KOI8-R", "KOI8-U", "Shift_JIS", "Windows-1250", "Windows-1251", "Windows-1252", "BINARY", "IBM437", "CP437", "IBM737", "CP737", "IBM775", "CP775", "CP850", "IBM850", "IBM852", "CP852", "IBM855", "CP855", "IBM857", "CP857", "IBM860", "CP860", "IBM861", "CP861", "IBM862", "CP862", "IBM863", "CP863", "IBM864", "CP864", "IBM865", "CP865", "IBM866", "CP866", "IBM869", "CP869", "Windows-1258", "CP1258", "GB1988", "macCentEuro", "macCroatian", "macCyrillic", "macGreek", "macIceland", "macRoman", "macRomania", "macThai", "macTurkish", "macUkraine", "CP950", "Big5-HKSCS:2008", "CP951", "IBM037", "ebcdic-cp-us", "stateless-ISO-2022-JP", "eucJP", "eucJP-ms", "euc-jp-ms", "CP51932", "EUC-JIS-2004", "EUC-JISX0213", "eucKR", "eucTW", "EUC-CN", "eucCN", "GB12345", "CP936", "ISO-2022-JP", "ISO2022-JP", "ISO-2022-JP-2", "ISO2022-JP2", "CP50220", "CP50221", "ISO8859-1", "ISO8859-2", "ISO8859-3", "ISO8859-4", "ISO8859-5", "ISO8859-6", "Windows-1256", "CP1256", "ISO8859-7", "Windows-1253", "CP1253", "ISO8859-8", "Windows-1255", "CP1255", "ISO8859-9", "Windows-1254", "CP1254", "ISO8859-10", "ISO8859-11", "TIS-620", "Windows-874", "CP874", "ISO8859-13", "Windows-1257", "CP1257", "ISO8859-14", "ISO8859-15", "ISO8859-16", "CP878", "MacJapanese", "MacJapan", "ASCII", "ANSI_X3.4-1968", "646", "UTF-7", "CP65000", "CP65001", "UTF-8-MAC", "UTF-8-HFS", "UCS-2BE", "UCS-4BE", "UCS-4LE", "CP932", "csWindows31J", "SJIS", "PCK", "CP1250", "CP1251", "CP1252", "UTF8-DoCoMo", "SJIS-DoCoMo", "UTF8-KDDI", "SJIS-KDDI", "ISO-2022-JP-KDDI", "stateless-ISO-2022-JP-KDDI", "UTF8-SoftBank", "SJIS-SoftBank", "locale", "external", "filesystem", "internal"]

¹ See [US-ASCII-8BIT](/56-us-ascii-8bit.html) for an explanation of the difference between the both ASCII encodings<br/>
² [Emacs style](https://www.gnu.org/software/emacs/manual/html_node/emacs/Specify-Coding.html)

## More Comments, More Magic

Besides encoding instructions there are two additional magic comments. Note that when you have multiple comments, you must put the encoding comment first or it will not work!

### Frozen Strings

Ruby 2.3 introduced the ability to make all string literals frozen by default:

    # encoding: stateless-iso-2022-jp-kddi
    # frozen_string_literal: true
    p "".frozen? # => true
    p "".encoding # => #<Encoding:stateless-ISO-2022-JP-KDDI>

You can also freeze string literals using the `--enable-frozen` command line option, but the magic comment will always overwrite the behavior of the source file in question.

### Indentation Warnings

    # warn_indent: true
    def method_name
      end

    # warning: mismatched indentations at 'end' with 'def' at 2

This warning also appears when running Ruby with the [`-w` command-line option](/3-ruby-can-you-speak-louder.html#command-line-options-for-debug-modes), but the magic comment will always overwrite the behavior of the source file in question.
