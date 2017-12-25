---
title: Big Data Without End
date: 2016-05-28
tags: core, syntax, keywords
commit: 344413c1e03d975b0955f643998d40f4d22282cc
---

Ruby's big `DATA` constant does more than you might expect!

ARTICLE

Everything after the `__END__` keyword (at the beginning of the line) is not interpreted as Ruby, but can be retrieved with the big¹ `DATA` constant.² This is an example `big-data.rb` script:

    p DATA.read
    __END__
    big data

Big `DATA` is a [File](https://ruby-doc.org/core/File.html) object, which you can `read`. The example will output `"big data"`. An example of real-world usage is [inline templating within the sinatra web framework](http://www.sinatrarb.com/intro.html#Inline%20Templates).³

¹ Do not confuse with the small `Data` class, which is a [CRuby implementation detail](https://ruby-doc.org/core/Data.html)<br/>
² Big `DATA` [is not defined](constant tree), if you have no `__END__`. Furthermore, it is not available if you did not execute the script directly, but loaded or requierd it.<br/>
³ [Actually, not really](http://blog.honeybadger.io/data-and-end-in-ruby/#a-work-around-for-multiple-files)

## Is the Data Section Enough?

Wait a minute! Big `DATA` is a [File](https://ruby-doc.org/core/File.html) object? What file exactly?

    p DATA.path
    p DATA.lineno
    __END__
    big data

The output will be `"big-data.rb"` and `3`. The big `DATA` object points to the source file itself at a specific position! And look, we can alter this:

    DATA.rewind
    puts DATA.gets("\n__END__")[0..-9]
    __END__
    big data

It will now read the source code of itself:

    DATA.rewind
    puts DATA.gets("\n__END__")[0..-9]

## Also See

- [`$ ruby -x`](/22-literate-ruby.html)
- [`SCRIPT_LINES__`](/5-constant-shadows.html)
