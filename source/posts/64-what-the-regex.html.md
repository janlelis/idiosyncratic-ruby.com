---
title: What the Regex?
date: 2018-05-07
tags: regex
commit: ca6efb72fcb188fe197dadb606f9921362d6cf0b
---

Regexes, the go-to-mechanism for string matching, must not only be written, but also need to be applied. This episode acts as a reference with some style advice for working with regular expressions in Ruby. If you are looking for resources on writing the actual regexes, take a look at the [link collection at the bottom](#regex-resources).

ARTICLE

## What do you Want to Achieve?

- [1 - Task: Check if Regex Matches](#task-check-if-regex-matches)
- [2 - Task: Find Single/First Occurrence](#task-find-singlefirst-occurrence)
- [3 - Task: Find All Occurrences](#task-find-all-occurrences)
- [4 - Task: Replace](#task-replace)
- [Special Task: Split String Into Array](#special-task-split-string-into-array)
- [Special Task: Filter Array of Strings](#special-task-filter-array-of-strings)
- [Special Task: Partition String](#special-task-partition-string)

## 1 - Task: Check if Regex Matches

### 1a) `match?`

This is the preferred way to check for a match since Ruby 2.4. It only returns `true` or `false`, but does not store any match data to get more performance:

    "string".match? /1.3/ # => false
    "123".match? /1.3/ # => true

### 1b) `=~`

This method is baked into Ruby's syntax, although its return value is rather special: It is the codepoint index in the string where the match occured or `nil` otherwise. However, it is a wise choice to only use it for its *truthy*/*falsey* value and use the more self-explaining [String#index method](https://ruby-doc.org/core/String.html#method-i-index) otherwise. Other than with the previous' `match?` approach, match data is set accordingly (this is the case with all other ways of matching) - see next section "[Find First Occurrence](#task-find-singlefirst-occurrence)" for ways to do so. Here is the example:

    "string" =~ /1.3/ # => false
    "123" =~ /1.3/ # => true

The match operator's sibling is `!~` which negates the match result:

    "string" !~ /1.3/ # => true
    "123" !~ /1.3/ # => false

More complicated matching can involve capture groups. Depending on the reference style (named or numbered), the way you can accees it differs:

#### Numbered: `$1-$9`

The [Perlish special variables](/9-globalization.html#list-of-all-special-global-variables) contain [the matches](/60-escape-back-referencing.html#special-regex-variables--back-references):

    "String with 42 things" =~ /(\d+) things/
    $1 # => "42"

#### Named: `$~`

The match data object contains the matches:

    "String with 42 things" =~ /(?<thing_count>\d+) things/
    $~[:thing_count] # => "42"

Note that regex matching with named captures can [implicitly create local variables](/14-meeting-some-locals.html#implicit-local-variables-through-regex-matching). This is extremely confusing and you should rather use the above syntax which is clearer, yet still maintains conciseness.

### 1c) Case Compare

Regex' `===` operator is also mapped to matching strings (returns `true` or `false`). However, although it should not be used directly¹, it allows you to write very expressive and readable case statements²:

    case variable = "string or number"
    when /\A\d+\z/
      variable.to_i
    when /\A\d+\.\d+\z/
      variable.to_f
    else
      variable.to_s
    end

¹ The reason: It depends on the order of both operands, regex must be first, which is rather unintuitive. String's `===` operator has a different semantic of just comparing two strings<br/>
² For more general documentation about equalness in Ruby, checkout [Episode 55: Struggling Four Equality](/55-struggling-four-equality.html).

## 2 - Task: Find Single/First Occurrence

### 2a) String#[]

A very readable way to to return the match result of the string is:

    "String with 42 things"[/\d\d/] # => "42"

You can also use capture groups here:

    "String with 42 things"[/\d(\d)/, 1] # => "2"
    "String with 42 things"[/(?<first>\d)\d/, :first] # => "4"

### 2b) `=~` + `$&`

If you prefer the `=~` syntax, you can retrieve the matched string with the special variable `$&`:

    "String with 42 things" =~ /\d+/
    $& # => "42"

### 2c) String#rindex

Worth mentioning is the special behavior of [String.rindex](https://ruby-doc.org/core/String.html#method-i-rindex). It will start the match process on the right side of string and return the first index, where a match is possible:

     "String with 42, sorry with 23 things".rindex /\d+/
     $& # => "3"

Note that it *does not* match `"23"`, but `"3"`. If you want to match an expression in relation to the end of the string you could use a positive-lookahead in combination with `\z`:

    "String with 42, sorry with 23 things" =~ /\d+(?=\D*\z)/
    $& # => "23"

## 3 - Task: Find All Occurrences

### 3) String#scan

Your friend is the [scan method](https://ruby-doc.org/core/String.html#method-i-scan) which returns an array of all results:

    "String with 42, sorry with 23 things".scan /\d+/ # => ["42", "23"]

## 4 - Task: Replace

The usual string replacement tool is **gsub** (**g**lobal **sub**stitution) which replaces all matching occurrences of the regex. Should you only want to replace the first occurrence, use the **sub** method instead.

### 4a) String#gsub with String Argument

    "String with 42 things".gsub /\d+/, "23" # => "String with 23 things"

You can use [back references](/60-escape-back-referencing.html) in the replacement string.

### 4b) String#gsub with Block

    "String with 42 things".gsub /\d+/ do
      $&.to_i + 1
    end # => "String with 43 things"

You can use [Perl-style regex globals](/60-escape-back-referencing.html) in the replacement block.

## Special Task: Split String Into Array

[Splitting a string](https://ruby-doc.org/core/String.html#method-i-split) along a separator is the main way of converting it into a useful array:

    array = "String with     42\nthings".split(/\s+/)
    # => ["String", "with", "42", "things"]

## Special Task: Filter Array of Strings

The [Enumerable#grep](https://ruby-doc.org/core/Enumerable.html#method-i-grep) method allows you to do so:

    ["String", "with", "42", "things"].grep(/\d/) # => ["42"]

Ther is also [Enumerable#grep_v](https://ruby-doc.org/core/Enumerable.html#method-i-grep_v) which returns all elements that do not match (think #reject):

    ["String", "with", "42", "things"].grep_v(/\d/) # => ["String", "with", "things"]

## Special Task: Partition String

Ruby's [String#partition](https://ruby-doc.org/core/String.html#method-i-partition) divides a string into an array consisting of three elements:

    parts = "String with 42 things".partition(/\d+/)
    parts # => ["String with ", "42", " things"]

- The string before regex match
- The regex match
- The string after the regex match

Note that you can get to the same result using [the special *pre-* and *post match* variables](/60-escape-back-referencing.html#special-regex-variables--back-references):

    "String with 42 things" =~ /\d+/
    parts = [$`, $&, $'] # => ["String with ", "42", " things"]

## Regex Resources

- [RDoc: Regular expressions](https://ruby-doc.org/core/doc/regexp_rdoc.html) - Ruby regex documentation
- [RDoc: Regexp](https://ruby-doc.org/core/Regexp.html) - Class docs (overlaps with general regex docs)
- [Episode 11: Regular Extremism](/11-regular-extremism.html) - Collection of advanced regex syntaxes
- [Episode 21: Uniform Resource Matching](/21-uniform-resource-matching.html) - URL regex included in Ruby's standard library
- [Episode 30: Regex with Class](/30-regex-with-class.html) - Overview of Unicode and POSIX-style character clasess
- [Episode 41: Proper Unicoding](/41-proper-unicoding.html) - Regex Unicode Property syntax (`\p{}`)
- [`re` method (part of irb.tools)](https://github.com/janlelis/debugging#restring-regex-groups--nil) - Displays first match (including capture groups) in the terminal
- [Rubular](http://rubular.com/) - Online regex testing
- [Onigmo](https://github.com/k-takata/Onigmo/blob/master/doc/RE) - Upstream repository of Ruby's regex engine

## Also See

- [What the Pack?](/4-what-the-pack.html)
- [What the Format?](/49-what-the-format.html)
- [What the Time?](/57-what-the-time.html)
