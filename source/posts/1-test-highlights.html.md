---
title: Test Highlights
date: 2015-05-01
tags: syntax, highlighter, tools
commit: f36c96bd3b07d63053b40c1e34e59159d4a5f851
---

Compared to other languages, Ruby does not have very good tool support for development. This might not be a problem for many of us, in the end, humans create the code, and not tools.

Nevertheless, it would be better to have better tools. Or at least valid syntax highlighting. The following table shows popular options for code highlighting, but none of them can manage to properly highlight more advanced Ruby features. Here is the:

ARTICLE

## Syntax Highlighter Comparison

Editor or Syntax Highlighter                       | Version        | Highlights Ruby Correctly?¹
---------------------------------------------------| ---------------|---------------
[coderay](https://github.com/rubychan/coderay)     | 1.1.0          | no. score: 4/5
[ruby mine](https://www.jetbrains.com/ruby/)       | 7.1 RM-141.664 | no. score: 4/5
[rouge](https://github.com/jneen/rouge)            | 1.8.0          | no. score: 3/5
[emacs](https://www.gnu.org/software/emacs/)       | 24.3.1         | no. score: 2/5
[pygments](http://pygments.org/)                   | 1.6            | no. score: 2/5
[gedit](https://wiki.gnome.org/Apps/Gedit)         | 3.10.4         | no. score: 1/5
[prism.js](https://github.com/PrismJS/prism)       | 0.0.1          | no. score: 1/5
[rainbow.js](https://github.com/ccampbell/rainbow) | 1.1.9          | no. score: 1/5
[src-highlight](https://www.gnu.org/software/src-highlite/) | 3.1.6 (library: 4:0:0)    | no. score: 1/5
[syntaxhighlighter.js](https://github.com/syntaxhighlighter/syntaxhighlighter) | 3.0.83 | no. score: 1/5
[vim](http://www.vim.org/)                         | 7.4.52         | no. score: 1/5
[atom](https://atom.io/)                           | 0.192.0        | no. score: 0/5
[highlight.js](https://github.com/isagalaev/highlight.js) | 8.5     | no. score: 0/5
[sublime text](https://www.sublimetext.com/)       | 3 Build 3083   | no. score: 0/5
{:.table-35-30-X}

¹ Obviously, passing the test does not necessarily mean that a tool highlights Ruby correctly - but it is an indication.

## The Idiosyncratic Ruby Syntax Highlight Test

    # # #
    # For Reference
    42
    "String with #{ :interpolation }"
    /regex$/
    $/

    # # #
    # TEST CASE 1: Question Marks
    # SHOULD BE HIGHLIGHTED AS: Array of Strings - Operator - String - Operator - String

    [?', ?(] ?'a':'b'

    # # #
    # TEST CASE 2: Percent Format
    # SHOULD BE HIGHLIGHTED AS: String - Operator - Array of Numbers

    "%d %d %d"%[1,2,3]

    # # #
    # TEST CASE 3: Space-delimited String
    # SHOULD BE HIGHLIGHTED AS: String Delimiter - String

    % 5 #

    # # #
    # TEST CASE 4: Multi-line Regex with Global Variable Interpolation
    # SHOULD BE HIGHLIGHTED AS: Regex Delimiter - Regex -
    #                           Interpolation Character (Optional) -
    #                           Global Variable -
    #                           Regex Delimiter - Regex Options

    /
    $$#$/
    /omix

    # # #
    # TEST CASE 5: Nested Heredoc
    # SHOULD BE HIGHLIGHTED AS: Method - String Delimiter - Operator -
    #                           String Delimiter - String - String Delimiter
    #                           String - String Delimiter

    puts <<HERE<<<<THERE
    foo 42
    HERE
    bla 43
    THERE