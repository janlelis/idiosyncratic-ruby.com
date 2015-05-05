---
title: Constant Shadows
date: 2015-05-06
tags: core, debug, surprise, stdlib
---

The **script lines** feature is probably the most famous example for idiosyncratic naming in Ruby!

ARTICLE

Ruby can save all source files you `load` or `require` as strings. This is useful for debugging utilities, for example, standard library's [debug](https://github.com/ruby/ruby/tree/trunk/lib/debug.rb) and [tracer](https://github.com/ruby/ruby/tree/trunk/lib/tracer.rb) both use these capabilities.

This is possible with the **script lines** object: It is a Ruby hash that stores all script filenames as keys and the whole file contents as values. It is not activated by default, you have to globally opt-in for it, which is done by *initializing it with an empty hash*!

### Quiz: How to Access this Magical Script Lines Hash:

A) `script_lines`<br>
B) `SCRIPT_LINES`<br>
C) `__SCRIPT_LINES`<br>
D) `__script_lines__`<br>
E) `SCRIPT_LINES__`<br>
F) `Ruby::DebugInfo::SCRIPT_LINES`<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
The answer is E: `SCRIPT_LINES__`

<blockquote>
<p><em>WEIRD. What gives with the trailing underscores? It’s such a big constant that it leaves a two-character shadow!!</em></p>
<a href="http://viewsourcecode.org/why/redhanded/inspect/whoaScript_lines__.html">&mdash; why</a>
</blockquote>

## Usage Example

It is a best practice to check if it already is defined, because someone else might have already activated it:


    SCRIPT_LINES__ = {} unless defined? SCRIPT_LINES__
    require 'abbrev'
    SCRIPT_LINES__.size
    # => 1
    SCRIPT_LINES__.keys.first
    # => "/home/user/.rvm/rubies/ruby-2.2.2/lib/ruby/2.2.0/abbrev.rb"
    SCRIPT_LINES__.values.first.is_a? Array
    # => true
    SCRIPT_LINES__.values.first.size
    # => 131

Running `puts SCRIPT_LINES__.values.first` will output every line of the file:

    #--
    # Copyright (c) 2001,2003 Akinori MUSHA <knu@iDaemons.org>
    #
    # All rights reserved.  You can redistribute and/or modify it under
    # the same terms as Ruby.
    #
    # $Idaemons: /home/cvs/rb/abbrev.rb,v 1.2 2001/05/30 09:37:45 knu Exp $
    # $RoughId: abbrev.rb,v 1.4 2003/10/14 19:45:42 knu Exp $
    # $Id: abbrev.rb 46784 2014-07-11 08:16:05Z hsbt $
    #++

    ##
    # Calculates the set of unambiguous abbreviations for a given set of strings.
    #
    #   require 'abbrev'
    #   require 'pp'
    #
    #   pp Abbrev.abbrev(['ruby'])
    #   #=>  {"ruby"=>"ruby", "rub"=>"ruby", "ru"=>"ruby", "r"=>"ruby"}
    #
    #   pp Abbrev.abbrev(%w{ ruby rules })
    #
    # _Generates:_
    #   { "ruby"  =>  "ruby",
    #     "rub"   =>  "ruby",
    #     "rules" =>  "rules",
    #     "rule"  =>  "rules",
    #     "rul"   =>  "rules" }
    #
    # It also provides an array core extension, Array#abbrev.
    #
    #   pp %w{ summer winter }.abbrev
    #
    # _Generates:_
    #   { "summer"  => "summer",
    #     "summe"   => "summer",
    #     "summ"    => "summer",
    #     "sum"     => "summer",
    #     "su"      => "summer",
    #     "s"       => "summer",
    #     "winter"  => "winter",
    #     "winte"   => "winter",
    #     "wint"    => "winter",
    #     "win"     => "winter",
    #     "wi"      => "winter",
    #     "w"       => "winter" }

    module Abbrev

      # Given a set of strings, calculate the set of unambiguous abbreviations for
      # those strings, and return a hash where the keys are all the possible
      # abbreviations and the values are the full strings.
      #
      # Thus, given +words+ is "car" and "cone", the keys pointing to "car" would
      # be "ca" and "car", while those pointing to "cone" would be "co", "con", and
      # "cone".
      #
      #   require 'abbrev'
      #
      #   Abbrev.abbrev(%w{ car cone })
      #   #=> {"ca"=>"car", "con"=>"cone", "co"=>"cone", "car"=>"car", "cone"=>"cone"}
      #
      # The optional +pattern+ parameter is a pattern or a string. Only input
      # strings that match the pattern or start with the string are included in the
      # output hash.
      #
      #   Abbrev.abbrev(%w{car box cone crab}, /b/)
      #   #=> {"box"=>"box", "bo"=>"box", "b"=>"box", "crab" => "crab"}
      #
      #   Abbrev.abbrev(%w{car box cone}, 'ca')
      #   #=> {"car"=>"car", "ca"=>"car"}
      def abbrev(words, pattern = nil)
        table = {}
        seen = Hash.new(0)

        if pattern.is_a?(String)
          pattern = /\A#{Regexp.quote(pattern)}/  # regard as a prefix
        end

        words.each do |word|
          next if word.empty?
          word.size.downto(1) { |len|
            abbrev = word[0...len]

            next if pattern && pattern !~ abbrev

            case seen[abbrev] += 1
            when 1
              table[abbrev] = word
            when 2
              table.delete(abbrev)
            else
              break
            end
          }
        end

        words.each do |word|
          next if pattern && pattern !~ word

          table[word] = word
        end

        table
      end

      module_function :abbrev
    end

    class Array
      # Calculates the set of unambiguous abbreviations for the strings in +self+.
      #
      #   require 'abbrev'
      #   %w{ car cone }.abbrev
      #   #=> {"car"=>"car", "ca"=>"car", "cone"=>"cone", "con"=>"cone", "co"=>"cone"}
      #
      # The optional +pattern+ parameter is a pattern or a string. Only input
      # strings that match the pattern or start with the string are included in the
      # output hash.
      #
      #   %w{ fast boat day }.abbrev(/^.a/)
      #   #=> {"fast"=>"fast", "fas"=>"fast", "fa"=>"fast", "day"=>"day", "da"=>"day"}
      #
      #   Abbrev.abbrev(%w{car box cone}, "ca")
      #   #=> {"car"=>"car", "ca"=>"car"}
      #
      # See also Abbrev.abbrev
      def abbrev(pattern = nil)
        Abbrev::abbrev(self, pattern)
      end
    end


## Memory Impact

Only use this for debugging purpose, since a lot of strings get loaded into your memory. This is a comparison loading ActiveSupport with and without script lines:

    require 'active_support/all'
    puts "#{`ps -o rss -p #{Process.pid}`.strip.split.last.to_i / 1024.0} MB"

Result: 16.421875 MB

    SCRIPT_LINES__ = {}
    require 'active_support/all'
    puts "#{`ps -o rss -p #{Process.pid}`.strip.split.last.to_i / 1024.0} MB"

Result: 19.85546875 MB

#### Resources

- [Source: SCRIPT_LINES__](https://github.com/ruby/ruby/blob/ruby_2_2/parse.y#L5446-L5460)
- [JRuby Source: SCRIPT_LINES__](https://github.com/jruby/jruby/blob/9.0.0.0.pre2/core/src/main/java/org/jruby/parser/Parser.java#L176-L189)
- [The memory profiling one-liner](http://stackoverflow.com/questions/7220896/get-current-ruby-process-memory-usage)
