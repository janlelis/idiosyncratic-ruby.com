---
title: The Art of Arguments
date: 2016-05-15
tags: core, globals, cli
commit: 5bc261c20e4378fb4dea3f61494f8b0f2fd6a327
---

There is nothing easier than parsing the command-line arguments given to your Ruby program: It is an array found in the special variable `$*`:

ARTICLE

    $ ruby -e 'p $*' -- some command line --arguments
    ["some", "command", "line", "--arguments"]

## That is Too Easy!

The trouble begins with supporting [common arguments conventions, like GNU's](http://www.gnu.org/prep/standards/html_node/Command_002dLine-Interfaces.html), and combining it with Ruby DSLs. This has lead to [hundreds of Ruby libraries](https://www.ruby-toolbox.com/categories/CLI_Option_Parsers) parsing command line options, even the [standard library](http://idiosyncratic-ruby.com/20-better-standards.html) includes two ways: [OptParse](http://ruby-doc.org/stdlib-2.4.0/libdoc/optparse/rdoc/OptParse.html) and [GetoptLong](http://ruby-doc.org/stdlib-2.4.0/libdoc/getoptlong/rdoc/GetoptLong.html).

## Which One is the Best?

Despite all the options above, I found myself using `$*` directly very often, because it is simple and does not require remembering the API of an option parser. Unfortunately, this also means loosing the ability to understand the mentioned conventions for command-line options.

This changed the day I came across the [minimist option parser](https://github.com/substack/minimist) for NodeJS! It evolved out of the **Optimist** option parser, which has the following slogan:

<blockquote>
<p><em>With Optimist, the options are just a hash! No optstrings attached.</em></p>
<a href="https://github.com/substack/node-optimist#examples">&mdash; node-optimist readme</a>
</blockquote>

## We Need This in Ruby!

[Why not?](https://github.com/janlelis/rationalist)¹ It features a superior API:

    $ ruby example/parse.rb -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
    { _: [ 'foo', 'bar', 'baz' ],
      x: 3,
      y: 4,
      n: 5,
      a: true,
      b: true,
      c: true,
      beep: 'boop' }

The contents of `parse.rb`:²

    require 'rationalist'
    p Rationalist.parse(ARGV)

- You always get back a Ruby hash
- Options get their own key
- Untreated arguments go to `:_`
- The default usage is simple, yet advanced processing is easily configurable

¹ **By the way:** On its syntactical surface, JavaScript and Ruby have more in commen than you would usually expect. Take arrays `[]` and hashes `{}`: They just look very similar!<br/>
² To continue the tradition of [Perl-style two-letter variables](/9-globalization.html), we should probably do:<br/>`$★ = Rationalist.parse(ARGV)`
