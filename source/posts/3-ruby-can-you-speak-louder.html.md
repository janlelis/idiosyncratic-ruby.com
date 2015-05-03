---
title: Ruby, Can You Speak Louder?
date: 2015-05-03
tags: debug, globals, cli-options
---

Ruby has some ways to turn on *debug mode*, which library authors can use to print out extra information for interested users. But unfortunately, there are multiple *debug modes* in Ruby. When should you use which one?

ARTICLE

Consider you have this code:

    def production_method
      puts "I am doing the right thing part 1"
      # @a is really intereting here
      puts "I am doing the right thing part 2"
    end

We could query the global `$DEBUG` variable, which can be toggled when starting the Ruby interpreter:

    def production_method
      puts "I am doing the right thing part 1"
      $stderr.puts "@a is now: #{@a}" if $DEBUG
      puts "I am doing the right thing part 2"
    end

But is this the best way? It also could have been:

    $stderr.puts "@a is now: #{@a}" if $VERBOSE

Or:

    $stderr.puts "@a is now: #{@a}" if Library.debug_mode?

And what about:

    warn "@a is now: #{@a}"

Ruby is a little idiosyncratic here. There is no standard way to signalize "I want to have more information". Ruby has two global debug modes: "Debug mode" and "Verbosity mode" and both behave differently. Within Ruby, the current debug mode state can be queried from two globals:

## Global Debug State

This table shows the different modes both of thems can have:

Variable   | Value   | CLI-Variable Mirrors¹ | Meaning
-----------|---------------------------------|---------------------
`$DEBUG`   | `true`  | `$-d == true`         | Debug mode active
`$DEBUG`   | `false` | `$-d == false`        | Debug mode inactive
`$VERBOSE` | `true`  | `$-v == true`<br>`$-w == true`<br>`$-W == 2`   | Verbosity mode active
`$VERBOSE` | `false` | `$-v == false`<br>`$-w == false`<br>`$-W == 1` | Medium verbosity mode
`$VERBOSE` | `nil`   | `$-v == nil`<br>`$-w == nil`<br>`$-W == 0`     | Silent verbosity mode
{:.table-15-15-30-X}

¹ Will be set automatically<br>
² Default

Note that the Verbosity mode is different for `$VERBOSE == false` and `$VERBOSE == nil`.

Another side note: While it is possible to change `$DEBUG` to an arbitrary value, this is not true for `$VERBOSE` - If you assign in a truish value, it will just be set to `true`.

What follows is a list of command line options that have an effects on the debug modes:

## Command Line Options

Option      | Alias      | Effects
------------|------------|--------
`-W2`       | `-W`, `-w` | Sets `$VERBOSE` to `true`
`-W1`       |            | Nothing (`$VERBOSE` remains `false`)
`-W0`       |            | Sets `$VERBOSE` to `nil`
`--verbose` |            | Sets `$VERBOSE` to `true`<br>Also quits Ruby if no arguments given
`-v`        |            | Sets `$VERBOSE` to `true`<br>Also Prints Ruby version<br>Also quits Ruby if no arguments given
`--debug`   | `-d`       | Sets `$DEBUG` to `true`<br>Sets `$VERBOSE` to `true`
{:.table-20-20-X}

A funny thing to note is that `-v` is a shortcut for `--version` as well as it is one for `--verbose`.

## Verbosity

The only thing that actually changes the behavior of the interpreter is the value of `VERBOSE`:

`$VERBOSE`             | Effect
-----------------------|--------------------------------
`true` or `false`      | `Kernel#warn` will output to `STDERR`
`true`                 | Interpreter warnings will be printed

## What to Use?

Use neither `$VERBOSE`, nor `$DEBUG`, but to use an instance variable in your library. Or use standard library's logger or some other logging gem. It is easier to understand than relying on the global debug modes.

Use `$VERBOSE = true` if you are interested in interpreter warnings.

## Further Reading
- [Verbose mode and warnings](http://mislav.uniqpath.com/2011/06/ruby-verbose-mode/)
- [Rails' verbosity silencer](http://api.rubyonrails.org/classes/Kernel.html#method-i-silence_warnings)
- [Ruby Loggers](https://www.ruby-toolbox.com/categories/Logging)
