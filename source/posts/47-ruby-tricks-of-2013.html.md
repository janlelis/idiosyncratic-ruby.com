---
title: Ruby TRICKS of 2013
date: 2016-05-16
tags: tricks, community, obfuscate, golf
commit: 5342f5d89d3938b20dc8820e7d355dd56be01358
---

Ruby was initially designed to be a successor of the Perl programming language, which also means that it inherited a lot of Perl's expressiveness. To celebrate this, the [TRIC¹ contest](https://github.com/tric/trick2013) was invented:

- Write the most Transcendental, Imbroglio Ruby program!
- Illustrate some of the subtleties (and design issues) of Ruby!
- Show the robustness and portability of Ruby interpreters!
- Stabilize the spec of Ruby by the presence of valuable but unmaintainable code!

The best submissions were awarded at the Japanese **Ruby Kaigi** conference and also [included in the Ruby source](https://github.com/ruby/ruby/tree/master/sample/trick2013), for educational purpose. The winning submissions² of 2013 were:

¹ *Transcendental Ruby Imbroglio Contest*<br/>
² *All code is MIT licensed, Copyright (c) 2013, TRICK Winners and Judges*

## 1st Place: "Best pangram"

By kinaba ([remarks](https://github.com/tric/trick2013/blob/master/kinaba/remarks.markdown))

*The program prints each ASCII character from 0x20 ' ' to 0x7e '~' exactly once*:

    !@THEqQUICKbBROWNfFXjJMPSvVLAZYDGgkyz&[%r{\"}mosx,4>6]|?'while(putc 3_0-~$.+=9/2^5;)<18*7and:`#

While this would not be such a complicated thing to accomplish, reconsider the program after reading the second constraint!

*The program contains each ASCII character from 0x20 ' ' to 0x7e '~' exactly once.*

This is what it outputs:

    !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~%

## 2nd Place: "Most Readable"

By Shinichiro Hamaji ([remarks](https://github.com/tric/trick2013/blob/master/shinh/remarks.markdown))

    begin with an easy program.
    you should be able to write
    a program unless for you,
    program in ruby language is
    too difficult. At the end
    of your journey towards the
    ultimate program; you must
    be a part of a programming
    language. You will end if
    you != program

This program does exactly nothing, but nevertheless, it is all valid syntax!

## 3rd Place: "Most classic"

By Yusuke Endoh ([remarks](https://github.com/tric/trick2013/blob/master/mame1/remarks.markdown))

Guess what this one does:

              eval$C=%q(at_exit{
              open("/dev/dsp","wb"){|g|h=[0]*80
              $><<"\s"*18+"eval$C=%q(#$C);S=%:"
              (S<<m=58).lines{|l|s=[128]*n=20E2
              t=0;           h.map!{|v|d=?!==l[
              t]?1                         :(l[
              t]==                         ?#)?
              0*v=                         6:03
              (v<1                         ?[]:
              0..n                         -1).
              each                         {|z|
              s[z]                         +=2*
      M.sin(($*[0]                         ||1)
    .to_f*M.sin(y=                 40*(z+m)*2**
    (t/12E0)/463)+               y)*(v-z*d/n)};
    t+=1;v-d};m+=                n;g.flush<<(s.
      pack"C*");                 puts(l)}}};M=
                                   Math);S=%:

             Jesu, Joy of Man's Desiring
                Johann Sebastian Bach

      #
      |                       #
      |                         #
                  #      #    #   #
                  |      |    |      #
                  |      |   #     #
               #           #  #    #
               |           |  |        #
               |           |    #    #
          #                   #   #  #
          |                   |   |       #
          |                   | #        #
               #           #      #       #
               |           |      |  #
               |           |  #   #
               #      #    #  #
               |      |    |    #
               |      |  #        #
        #           #      #       #
        |           |      |         #
        |           |        #         #
          #              #    #      #
          |              |    |    #
          |              |        #
           #           #   #    #
           |           |   |      #
           |          #|      #
             #      #  |     #
             |      |  |      #
             |         | #      #
                 #  #    #      #
                 |  |        #  |
                 |  |         # #
             #               #  #  #
             |               |  | #
             |               |  #
                  #      #    #   #
                  |      |    #   |
                  |          #  # |
               #  #           #   #
               |  |           |      #
               |  |          #     #
           #               #  #    #
           |               |  |        #
           |               |    #    #
          #                   #   #  #
          |                   |   |       #
          |                   | #        #
               #           #      #       #
               |           |      |  #
               |           |  #   #
             #        #    #  #
             |        |    |    #
             |        |       #   #
           #           #   #    #
           |           |        |    #
           |           |     #     #
            #              #  #   #
            |              |  | #
            |              #  #
             #      #    #
             |      |    |    #
             |         # |   #
      #               #  #    #
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    |
      |               |  |    :

Right! It will play some lovely classical music! Run it with:³

    $ padsp ruby entry.rb

³ See [Limitations](https://github.com/tric/trick2013/blob/master/mame1/remarks.markdown#limitation) for how to play it on Mac OS

## Also See

- [TRIC 2018](/75-ruby-tricks-of-2018.html)
- [TRIC 2015](/48-ruby-tricks-of-2015.html)

## Other Awarded Submissions

- ["Worst Abuse of Constants - Dishonorable Mention"](https://raw.githubusercontent.com/tric/trick2013/master/yhara1/entry.rb) by Yutaka Hara ([remarks](https://github.com/tric/trick2013/blob/master/yhara1/remarks.markdown))
- ["Most Competitive"](https://raw.githubusercontent.com/tric/trick2013/master/mame2/entry.rb) by Yusuke Endoh ([remarks](https://github.com/tric/trick2013/blob/master/mame2/remarks.markdown))
- ["Best Way to Return true"](https://raw.githubusercontent.com/tric/trick2013/master/unak/entry.rb) by NAKAMURA Usaku ([remarks](https://github.com/tric/trick2013/blob/master/unak/remarks.en.markdown))
- ["Worst House of Garbage"](https://raw.githubusercontent.com/tric/trick2013/master/nari/entry.rb) by Nakamura Narihiro ([hello_world.br](https://raw.githubusercontent.com/tric/trick2013/master/nari/hello_world.br), [remarks](https://github.com/tric/trick2013/blob/master/nari/remarks.en.markdown))
- ["Ruby by Ruby for Ruby Award"](https://raw.githubusercontent.com/tric/trick2013/master/yhara2/entry.rb) by Yutaka Hara ([remarks](https://github.com/tric/trick2013/blob/master/yhara2/remarks.markdown))
- ["Most Characteristic"](https://raw.githubusercontent.com/tric/trick2013/master/yoshi-taka/entry.rb) by yoshi-taka ([remarks](https://github.com/tric/trick2013/blob/master/yoshi-taka/remarks.markdown))
- ["Good Way to make Programs Wonderful"](https://raw.githubusercontent.com/tric/trick2013/master/baban/entry.rb) by baban ([remarks](https://github.com/tric/trick2013/blob/master/baban/remarks.markdown))
