---
title: Constant Shuffle
date: 2016-05-14
tags: core, constants
commit: 6e5232fda866ad899915fc12c120833f41990308
---

Today, another snippet from the category *[don't try at home, might have unforseeable consequences!](/16-changing-the-rules.html)*

ARTICLE

Constant assignment¹ is not permanent in Ruby, so it is perfectly valid to do this:

    module A
    end

    class B
      def initialize
        p 42
      end
    end

    A, B = B, A
    # warning: already initialized constant A
    # warning: previous definition of A was here
    # warning: already initialized constant B
    # warning: previous definition of B was here
    A.new  #=> #<B:0x00000002744008>
    # 42

¹ As a side note: There is also [Module#remove_const](http://ruby-doc.org/core-2.3.1/Module.html#method-i-remove_const), which will delete the constant, but not the module! Quoting the documentation: *"If that constant referred to a module, this will not change that module's name and can lead to confusion"*

    o = Object.send(:remove_const, :Object)
    Object.constants # NameError: uninitialized constant Object
    o # => Object

## The Ruby Shuffle

Developing the swapping idea further, for maximal confusion:

    require 'stringio'
    def shuffle_ruby(n=rand(50))
      mod, os, e, sio = Module, ObjectSpace, Exception, StringIO
      stderr, $stderr = $stderr, sio.new
      n.times{
        begin
          m1 = os.each_object(mod).to_a.sample
          m2 = os.each_object(mod).to_a.sample
          puts "Swap #{m1} and #{m2}"
          eval "#{m1}, #{m2} = #{m2}, #{m1}"
        rescue e
        end
      }
      $stderr = stderr
      puts "Ruby shuffled (#{n} swaps)"
    end
