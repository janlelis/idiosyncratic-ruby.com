---
title: Easier Switching
date: 2015-05-07
tags: cli-options, globals
commit: a911aa14618828c656916c15711428364a6ece7e
---

There is a command-line switch to enable command-line switches:

ARTICLE

## `-s`

    Enables some switch parsing for switches after script name but before
    any file name arguments (or before a --).  Any switches found there
    are removed from ARGV and set the corresponding variable in the script.

In this context "corresponding variable" means *global variable*. Let's see this in action (the `-e` option is for executing the Ruby code that follows in a string):

    $ ruby -se 'p $option'
    # nil

    $ ruby -se 'p $option' -- -option
    # true

## Switching Files

You can add command-line options to the [Ruby shebang line](https://en.wikipedia.org/wiki/Shebang_%28Unix%29), which makes using the switch feature from the command-line more readable. Create a Ruby file (`switch.rb`) and add:

    #!ruby -s
    p $option

No you can call it like this:

    $ ruby switch.rb -option
    # true


## Caveats!

You should be careful, not to trigger the wrong switches:

    $ ruby switch.rb -LOAD_PATH
    switch.rb: $LOAD_PATH is a read-only variable (NameError)

    $ ruby switch.rb -0
    switch.rb: no implicit conversion of true into String (TypeError)

    $ ruby switch.rb -stdout
    switch.rb: $stdout must have write method, TrueClass given (TypeError)

    $ ruby switch.rb -SAFE
    switch.rb: no implicit conversion of true into Integer (TypeError)

## Resources

- `man ruby`