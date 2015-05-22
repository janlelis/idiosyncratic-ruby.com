---
title: Literate Ruby
date: 2015-05-22
tags: cli-options
commit: 751cdf3016fe52c0647e2b5798eb1732c2d9c74a
---

Ruby has a built-in feature that is much like [Literate CoffeeScript](http://coffeescript.org/#literate). In contrast to it, this Ruby option will not ignore literature, but garbage:

ARTICLE

## `-x[directory]`

    Tells Ruby that the script is embedded in a message.
    Leading garbage will be discarded until the  first line
    that starts with “#!” and contains the string, “ruby”.
    Any meaningful switches on that line will be applied.
    The end of the script must be specified with either EOF,
    ^D (control-D), ^Z (control-Z), or the reserved word
    __END__.  If the directory name is specified, Ruby will
    switch to that directory before executing script.

Awesome!

<pre>
#! Let's see this in action, using this blog post about ruby
puts "Idiosyncratic Ruby"
__END__
</pre>
Paste the whole content of this article into a file and execute it with:

    $ ruby -x FILENAME

## Further Reading

- `man ruby`