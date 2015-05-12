---
title: More Inspections
date: 2015-05-12
tags: core, irb, cli-options
commit: a1ca4750de9d1170719c67a34d0bc44e149c3429
---

Some of IRB's command-line options can be called idiosyncratic as well. Take *math mode* as an example: It will require the infamous [mathn](https://github.com/ruby/ruby/blob/trunk/lib/mathn.rb) library on start up:

    $ irb -m
    >> Math #=> CMath
    >> 3/2 #=> (3/2)
    >> !!defined?(Vector) #=> true

And another one surprised me: You can pass custom [inspectors](https://github.com/ruby/ruby/blob/trunk/lib/irb/inspector.rb) to IRB, for example, *yaml*:

    $ irb -f --inspect yaml
    >> [1,2,3]
    => ---
    - 1
    - 2
    - 3

Or *marshal*:

    $ irb -f --inspect marshal
    >> 42
    => i/

But you can also define *your own inspectors on the fly*:

    $ irb -f --inspect "{ |r| r.to_s.reverse }"
    >> [1,2,3]
    => ]3 ,2 ,1[

It will be eval'd (!) as the block part of a new `proc`.


## Resources

- `man irb`
- [Source: irb/context](https://github.com/ruby/ruby/blame/trunk/lib/irb/context.rb)
- [Source: irb/inspectors](https://github.com/ruby/ruby/blob/trunk/lib/irb/inspector.rb)