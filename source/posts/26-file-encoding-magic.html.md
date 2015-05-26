---
title: File Encoding Magic
date: 2015-05-26
tags: core, encoding, stdlib
---

Ruby has [three default encodings](http://graysoftinc.com/character-encodings/ruby-19s-three-default-encodings). One of them is the default [source encoding](http://ruby-doc.org/core-2.2.2/Encoding.html#class-Encoding-label-Script+encoding), which can be set using a **magic comment** in the file's first line, or in the second line if the first line is taken by a [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29).

ARTICLE

Default source encoding (UTF-8):

    p "".encoding #=> #<Encoding:UTF-8>

With encoding comment (`file_with_magic_comment.rb`):

    # coding: cp1252
    p "".encoding #=> #<Encoding:Windows-1252>

## Respecting the Encoding Comment when Reading a File

You might come across a situation, where you want to read in a source file using Ruby's [File](http://ruby-doc.org/core-2.2.2/File.html) class, but also want to set the proper encoding from the magic comment. Fortunately, Ruby's standard library supports this. Unfortunately, it is not a stand-alone module, but a part of IRB:

    >> require 'irb/magic-file'
    # => false
    >> IRB::MagicFile
    # => #<Object:0x00000001a6bb10>
    >> File.open('file_with_magic_comment.rb').read.encoding
    # => #<Encoding:UTF-8>
    >> IRB::MagicFile.open('file_with_magic_comment.rb').read.encoding
    # => #<Encoding:Windows-1252>

## Resources

- [Source: irb/magic-file](https://github.com/ruby/ruby/blob/trunk/lib/irb/magic-file.rb)
- [Grammar: parser_magic_comment](https://github.com/ruby/ruby/blob/ruby_2_2/parse.y#L6980)