---
title: Globalization
date: 2015-05-09
tags: core, globals, stdlib
commit: b2bd19014880f6a065962abb63300bf5cabea233
---

This is an overview of all the special, two-letter (and other) global variables in Ruby, which Ruby [inherited from Perl](http://www.perlmonks.org/?node_id=353259).

For the purpose of improving code readability, Ruby comes with [English.rb](https://github.com/ruby/ruby/blob/trunk/lib/English.rb) in its standard library (or [Deutsch.rb](https://github.com/janlelis/Deutsch.rb/blob/master/lib/Deutsch.rb) as gem), which provides non-cryptic aliases and some documentation.

Ruby also defines some three-letter global variables that mirror CLI options (`$-…`)

ARTICLE

## Types of Special Global Variables

Idiosyncratically, not all special global variables are global:

Type        | Scope
------------|------
global      | Real global variable
thread      | Thread-global variable: Can have different values in different threads
pseudo      | Looks like a global variable, but is a local variable
defunct     | Not working, anymore (removed from Ruby)
read-only   | Variable cannot be set to a new value
(read-only) | Variable cannot be set to a new value, but is an array that is mutable
{:.table-20-X}


## List of All Special Global Variables

The first table contains all two-letter variables and their aliases:

Perlish | Type   | English                  | Short    | Info
--------|--------|--------------------------|----------|------------------
$! | thread      | $ERROR_INFO              | -        | [RDoc](https://ruby-doc.org/core/Exception.html)
$@ | thread      | $ERROR_POSITION          | -        | [RDoc](https://ruby-doc.org/core/Exception.html)
$; | global      | $FIELD_SEPARATOR         | $FS, $-F¹| [RDoc](https://ruby-doc.org/core/String.html#method-i-split)
$, | global      | $OUTPUT_FIELD_SEPARATOR  | $OFS     | [RDoc](https://ruby-doc.org/core/IO.html#method-i-print)
$/ | global      | $INPUT_RECORD_SEPARATOR  | $RS, $-0¹| [RDoc](https://ruby-doc.org/core/IO.html#method-i-gets)
$\ | global      | $OUTPUT_RECORD_SEPARATOR | $ORS     | [RDoc](https://ruby-doc.org/core/IO.html#method-i-print)
$. | global      | $INPUT_LINE_NUMBER       | $NR      | [RDoc](https://ruby-doc.org/core/IO.html#method-i-lineno)
$_ | pseudo      | $LAST_READ_LINE          | -        | [RDoc](https://ruby-doc.org/core/IO.html#method-i-gets)
$> | global      | $DEFAULT_OUTPUT          | $stdout¹ | [IO in Ruby](https://robots.thoughtbot.com/io-in-ruby)
$< | global      | $DEFAULT_INPUT           | - (ARGF) | [RDoc](http://www.rubydoc.info/stdlib/core/ARGF)
$$ | read-only   | $PROCESS_ID              | $PID     | [Unix Processes](http://allenlsy.com/working-with-unix-process-in-ruby/)
$? | thread / read-only | $CHILD_STATUS     | -        | [RDoc](https://ruby-doc.org/core/Process.html#method-c-wait)
$~ | pseudo      | $LAST_MATCH_INFO         | -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$= | defunct     | $IGNORECASE              | -        | -
$* | (read-only) | $ARGV                    | -        | [Explanation](/50-the-art-of-arguments.html)
$& | pseudo / read-only | $MATCH            | -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$` | pseudo / read-only | $PREMATCH         | -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$' | pseudo / read-only | $POSTMATCH        | -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$+ | pseudo / read-only | $LAST_PAREN_MATCH²| -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$: | (read-only) | $LOAD_PATH¹              | $-I¹     | [RHG: Loading](https://ruby-hacking-guide.github.io/load.html)
$" | (read-only) | $LOADED_FEATURES¹        | -        | [RHG: Loading](https://ruby-hacking-guide.github.io/load.html)
$0 | global      | $PROGRAM_NAME¹           | -        | [RDoc](https://ruby-doc.org/core/Process.html#method-c-argv0)
$1 - $9³ | pseudo | -                        | -        | [RDoc](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Special+global+variables)
$F⁴| global      | -                        | -        | [Auto-Splitting Lines](https://idiosyncratic-ruby.com/17-stream-editing.html#auto-splitting-lines)
{:.table-12-20-36-14-X}

¹ Available without requiring English.rb<br/>
² No *T*, because it stands for *PARENTHESES*, not *PARENT*<br>
³ Starting with Ruby 2.4, [$1 - $9 only get defined when they are currently set](https://twitter.com/JanLelis/status/813836232245575680)<br>
⁴ With command-line option `-a`

### Other Special Global Variables

Name               | Type      | Info
-------------------|-----------|------------------
$stdin             | global    | [IO in Ruby](https://robots.thoughtbot.com/io-in-ruby)
$stderr            | global    | [IO in Ruby](https://robots.thoughtbot.com/io-in-ruby)
$SAFE              | thread    | [Level 1: Tainting](http://phrogz.net/programmingruby/taint.html#table_20.1) (other levels were removed)
$FILENAME          | read-only | The current file being read via ARGF. Same as [ARGF.filename](http://www.rubydoc.info/stdlib/core/ARGF#filename-instance_method).
$KCODE, $-K        | defunct   | -
$DEBUG, $-d        | global    | [Global Debug States](https://idiosyncratic-ruby.com/3-ruby-can-you-speak-louder.html#global-debug-state)
$VERBOSE, $-v, $-w | global    | [Global Debug States](https://idiosyncratic-ruby.com/3-ruby-can-you-speak-louder.html#global-debug-state)
$-W                | global    | [Global Debug States](https://idiosyncratic-ruby.com/3-ruby-can-you-speak-louder.html#global-debug-state)
$-p                | read-only | [Stream Editing](https://idiosyncratic-ruby.com/17-stream-editing.html)
$-l                | read-only | [Specify Line Format](https://idiosyncratic-ruby.com/17-stream-editing.html#specify-line-format)
$-a                | read-only | [Auto-Splitting Lines](https://idiosyncratic-ruby.com/17-stream-editing.html#auto-splitting-lines)
$-i                | global    | [Inplace-Editing Files](https://idiosyncratic-ruby.com/17-stream-editing.html#inplace-editing-files)
{:.table-20-15-X}
