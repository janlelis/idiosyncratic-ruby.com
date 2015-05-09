---
title: Globalization
date: 2015-05-09
tags: core, globals, stdlib
---

This is an overview of all the special, two-letter global variables in Ruby, which Ruby [inherited from Perl](http://www.perlmonks.org/?node_id=353259). For the purpose of improving code readability, Ruby comes with [English.rb](https://github.com/ruby/ruby/blob/trunk/lib/English.rb) in its standard library, which provides non-cryptic aliases and explainations.

ARTICLE


## Types of Global Variables

Type        | Scope
------------|------
global      | Real Global variable
thread      | Thread-global variable: Can have different values in different threads
pseudo      | Looks like a global variable, but is a local variable
defunct     | Not working (anymore)
read-only   | Variable cannot be set to a new value
(read-only) | Variable cannot be set to a new value, but is an array that is mutable
{:.table-20-X}

Not all special global variabales are global. This is definitely idiosyncratic.

## List of All Two-Letter Global Variables

Perlish | Type   | English                  | Short    | Info
-----------------|--------------------------|----------|------------------
$! | thread      | $ERROR_INFO              | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Exception.html)
$@ | thread      | $ERROR_POSITION          | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Exception.html)
$; | global      | $FIELD_SEPARATOR         | $FS, $-F¹| [RDoc](http://ruby-doc.org/core-2.2.2/String.html#method-i-split)
$, | global      | $OUTPUT_FIELD_SEPARATOR  | $OFS     | [RDoc](http://ruby-doc.org/core-2.2.2/IO.html#method-i-print)
$/ | global      | $INPUT_RECORD_SEPARATOR  | $RS, $-0¹| [RDoc](http://ruby-doc.org/core-2.2.2/IO.html#method-i-gets)
$\ | global      | $OUTPUT_RECORD_SEPARATOR | $ORS     | [RDoc](http://ruby-doc.org/core-2.2.2/IO.html#method-i-print)
$. | global      | $INPUT_LINE_NUMBER       | $NR      | [RDoc](http://ruby-doc.org/core-2.2.2/IO.html#method-i-lineno)
$_ | pseudo      | $LAST_READ_LINE          | -        | [RDoc](http://ruby-doc.org/core-2.2.2/IO.html#method-i-gets)
$> | global      | $DEFAULT_OUTPUT          | $stdout¹ | [Article](https://robots.thoughtbot.com/io-in-ruby)
$< | global      | $DEFAULT_INPUT           | -        | [RDoc](http://www.rubydoc.info/stdlib/core/ARGF)
$$ | read-only   | $PROCESS_ID              | $PID     | [Article](http://allenlsy.com/working-with-unix-process-in-ruby/)
$? | thread / read-only | $CHILD_STATUS     | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Process.html#method-c-wait)
$~ | pseudo      | $LAST_MATCH_INFO         | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$= | defunct     | $IGNORECASE              | -        | -
$* | (read-only) | $ARGV                    | -        | [Article](http://jnoconor.github.io/blog/2013/10/13/a-short-explanation-of-argv/)
$& | pseudo / read-only | $MATCH            | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$` | pseudo / read-only | $PREMATCH         | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$' | pseudo / read-only | $POSTMATCH        | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$+ | pseudo / read-only | $LAST_PAREN_MATCH²| -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$: | (read-only) | $LOAD_PATH¹              | $-I¹     | [Article](http://selfless-singleton.rickwinfrey.com/2012/12/20/-rubys-load-path/)
$" | (read-only) | $LOADED_FEATURES¹        | -        | [Article](https://ruby-hacking-guide.github.io/load.html)
$0 | global      | $PROGRAM_NAME¹           | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Process.html#method-c-argv0)
$1 - $9 | pseudo | -                        | -        | [RDoc](http://ruby-doc.org/core-2.2.2/Regexp.html#class-Regexp-label-Special+global+variables)
$F³| global      | -                        | -        | [Manpage](http://manpages.ubuntu.com/manpages/intrepid/man1/ruby.1.html#contenttoc4)
{:.table-15-20-40-15-X}

¹ Available without requiring English.rb<br/>
² No "T"<br>
³ With command-line option `-a`

## Translations

There are approaches to translate all variables to other languages, for example, to German. You will need [Deutsch.rb](https://github.com/janlelis/Deutsch.rb/blob/master/lib/Deutsch.rb) to be able to use these:

Perlish | German                | Short
--------------------------------|---------
$! | $FEHLER_INFO               | -
$@ | $FEHLER_POSITION           | -
$; | $FELD_TRENNER              | $FT
$, | $AUSGABE_FELD_TRENNER      | $AFT
$/ | $EINGABE_DATENSATZ_TRENNER | $DT
$\ | $AUSGABE_DATENSATZ_TRENNER | $ADT
$. | $EINGABE_ZEILEN_NUMMER     | $NR
$_ | $ZULETZT_GELESENE_ZEILE    | -
$> | $STANDARD_AUSGABE          | $stdraus
$< | $STANDARD_EINGABE          | -
$$ | $PROZESS_ID                | $PID
$? | $KIND_STATUS               | -
$~ | $LETZTE_ÜBEREINSTIMMUNG    | -
$= | $IGNORIERE_SCHREIBUNG      | -
$* | $ARGV                      | -
$& | $ÜBEREINSTIMMUNG           | -
$` | $VORÜBEREINSTIMMUNG        | -
$' | $NACHÜBEREINSTIMMUNG       | -
$+ | $LETZTE_ELTERN_ÜBEREINSTIMMUNG | -
$: | $LADE_PFAD                 | -
$" | $GELADENE_FUNKTIONALITÄTEN | -
$0 | $PROGRAMM_NAME             | -
{:.table-15-50-X}

Feel free to [open a new pull request](https://github.com/janlelis/idiosyncratic-ruby.com/pulls) for more languages.