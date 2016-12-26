---
title: Stream Editing
date: 2015-05-17
tags: cli-options, golf, globals, one-liner
commit: a9bb48a0cd603d93ee663e08063ad8724349ee65
---

One of Ruby's goals was to replace popular unix *stream editors* like `awk` or `sed`, which both have the concept of manipulating files in a line-based manner. Ruby has the `-n` option for this:

ARTICLE

    Causes Ruby to assume the following loop around your script, which makes it
    iterate over file name arguments somewhat like sed -n or awk.

          while gets
            ...
          end

And its sibling `-p`:

    Acts mostly same as -n switch, but print the value of variable $_ at the each
    end of the loop.
    For example:

          % echo matz | ruby -p -e '$_.tr! "a-z", "A-Z"'
          MATZ

What you need to know is that the [special global variable](http://idiosyncratic-ruby.com/9-globalization.html) `$_` contains the last read input. When using `-n` or `-p`, this usualy means the current line. Another thing to keep in mind: `gets` reads from [`ARGF`](http://readruby.io/io#argf), not from `STDIN`, so you can pass arguments that will be interpreted as filenames of the files that should be processed. Equipped with this knowlegde, you can build a very basic example, which just prints out the given file:

    $ ruby -ne 'print $_' filename

Since print without arguments implicitely prints out `$_`, this can be shortened to:

    $ ruby -ne 'print' filename

If one uses `-p`, instead of `-n`, no code is required, because `-p` will call `print` implicitely:

    $ ruby -pe '' filename

Now let's modify each line:

    $ ruby -pe '$_.reverse!' filename

This will print out the file with all its lines reversed.

Here is another example, which will print every line in a random ANSI color:

    $ ruby -ne 'print "\e[3#{rand(8)}m#$_"' filename

There is more to assist you in writing these short line manipulation scripts:

## The Ruby One-Liner Toolbox

* CLI Options: `-n` `-p` `-0` `-F` `-a` `-i` `-l`
* Global Variables: `$_` `$/` `$\` `$;` `$F` `$.`
* Methods that operate on `$_`, implicetly: `print` `~`
* The special `BEGIN{}` and `END{}` blocks

## Running Code Before or After Processing the Input

You can run code before the loop starts with `BEFORE` and after the loop with `END`. For example, this will count characters:

    $ ruby -ne 'BEGIN{ count = 0 }; count += $_.size; END{ print count }' filename

## Using Line Numbers

`$.` contains the current line number. A use-case would be counting the lines of a file:

    $ ruby -ne 'END{p$.}' filename

## String Matching

Now let's do some conditional processing: Only print a line if it contains a digit:

    $ ruby -ne 'print if ~/\d/' filename

The message to take away: The `~` method implicitely matches the regex against `$_`.

But it gets even better:

    $ ruby -ne 'print if /\d/' filename

You thought conditions with a truthy value will always execute the `if`-branch of a conditions? They will not, if the truthy value is a non-matching regex literal!

This also works when using the ternary operator for conditions:

    $ ruby -ne 'puts "#$.: #{ /\d/ ? "first digit: #$&" : "no digit" }"' filename

## Inplace-Editing files

Using the `-i` option, you can modify files directy (just like `sed`'s `-i` mode). For example, removing all trailing spaces:

    $ ruby -ne 'puts $_.rstrip!' -i filename

Like in `sed`, you can provide a file extension to the `-i` option which will be used to create a backup file before processing:

    $ ruby -pe '$_.upcase!' -i.original filename

## Auto-splitting Lines

The `-a` option will run `$F = $_.split` for every line:

    $ ruby -nae 'puts $F.reverse.join(" ")' filename

## Specify Line Format

You might not always want to use `\n` as the character that separates lines. Fortunately, Ruby has [record separators](http://idiosyncratic-ruby.com/16-changing-the-rules.html#change-a-global-default-separator), and you can set some of them via command-line options:

Option | Variable  | Description
-------|-----------|------------
`-0`   | `$/`      | Sets the *input record separator*, which is used by `Kernel#gets`. Character to use must be given as [octal number](http://en.wikipedia.org/wiki/Octal). If no number is given (`-0`), it will use null bytes as separator. Using `-0777` will read in the whole file at once. Another special value is `-00`, which will set `$_` to `"\n\n"` (paragraph mode).
`-F`   | `$;`      | Sets the *input field separator*, which is used by `Array#split`. Useful in combination with the `-a` option.
`-l`   | `$\`      | Sets the *output record separator* to the value of the *input record separator* (`$/`). Also runs [String#chop!](http://ruby-doc.org/core-2.4.0/String.html#method-i-chop-21) on every line!
{:.table-10-10-X}

## Further Reading

- [sed](https://en.wikipedia.org/wiki/Sed)
- [un](http://idiosyncratic-ruby.com/6-run-ruby-run.html)
- [pru](https://github.com/grosser/pru)