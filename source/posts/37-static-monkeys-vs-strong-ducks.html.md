---
title: Static Monkeys vs. Strong Ducks
date: 2016-05-06
tags: core, types, language, syntax, community
commit: cad922af6e336f347d193ad8cb22b92200265f27
---

Programming languages have been, and will always be categorized by their [typing system](https://en.wikipedia.org/wiki/Type_system). Naturally, large parts of the Ruby community (including myself) have some kind of aversion against static typing. But while Ruby goes down the route of being dynamically typed that does not mean that you are not allowed to use some form of types!

ARTICLE

Put differently, nothing is wrong with ensuring a specific behavior of arguments given to, or received from a method. You sometimes do it anyways, for example:

- When you raise an error, because the argument given is not a `Numeric`
- When you raise an error, because an argument does not respond to `:to_i`
- When you check that something has a trueish value

The second example is checking if an object has a specific method, you could call it [duck type checking](https://en.wikipedia.org/wiki/Duck_typing).

The third example might not look logical at first glance, but: As soon as you check if an object is not "falsy", you are doing some kind of type checking. The type is "trueish" and it is very implicit (every object that is not `nil` or `false`) . Such *type checks* are normal, not necessarily a bad thing, and it also does not mean static typing is much better, and we all should use [Haskell](https://en.wikipedia.org/wiki/Haskell_%28programming_language%29). It is more about how to think about types and how to have conversations about types.

## Almighty Staticness?

Static type systems often use compile time type checking, which lets you catch a specific type of bugs earlier. It also opens the room for a much better performance. There are some very Ruby-like languages that use static types and achieve a much better performance, namely [Mirah](http://www.mirah.org/) and [Crystal](http://crystal-lang.org/).

However, having to annotate everything is a very strict requirement. It is not **Don't Repeat Yourself**. It is harder to work with and less flexible. It is not backwards-compatible with existing Ruby code. Unless you put an unrealisticly huge effort into it, it will not proof your software is correct. It will not free you from the responsibilty to ensure your program is working properly (for instance, by writing tests).

Yet, it will check types for you.

## Manual Type Checking at Runtime

There are some options out there that can assist you with explicitly and optionally checking the type of method arguments and return values, for example [Rubype](https://github.com/gogotanaka/Rubype), or my very similar [sig](https://github.com/janlelis/sig) library:

    # On main object
    sig [:to_i, :to_i], Integer,
    def sum(a, b)
      a.to_i + b.to_i
    end

    sum(42, false)
    # Sig::ArgumentTypeError:
    # - Expected false to respond to :to_i

    # In modules
    class A
      sig [Numeric, Numeric], Numeric,
      def mul(a, b)
        a * b
      end
    end

    A.new.mul(4,"3")
    # Sig::ArgumentTypeError:
    # - Expected "3" to be a Numeric, but is a String


    # Explicitely define signature for singleton_class
    class B
      sig_self [:reverse],
      def self.rev(object)
        object.reverse
      end
    end

    B.rev 42
    # Sig::ArgumentTypeError:
    # - Expected 42 to respond to :reverse

There is also some [acadamic work](http://www.cs.umd.edu/~jfoster/papers/oops13.pdf) that explores advanced runtime checking (like "gradual" typing) and resulted in the [Ruby Type Checker](https://github.com/plum-umd/rtc).

## Future

But isn't the point of Ruby being a dynamic language and not having to care about types? 

…which is true and false at the same time. We are still dealing with types, since we do type checks all the time. Type checking is not a binary question. As a matter of fact, some form of static typing will [perhaps be introduced in Ruby 3.0](http://confreaks.tv/videos/rubyconf2014-opening-keynote)!

## Conclusion

Types are not evil, they are all around us. Ruby 3.0 may include a new typing system. That is great news! In order to be as *rubyistic* as possible, it should:

- Be optional
- Support duck types
- Have an intuitive syntax
- Perhaps use [gradual typing](https://en.wikipedia.org/wiki/Gradual_typing)
- Help us all writing better programs

## Further Reading

- [Ruby Issue Tracking System: Feature #9999](https://bugs.ruby-lang.org/issues/9999)
- [Will Ruby 3.0 be Statically Typed?](https://www.omniref.com/blog/2014/11/17/matz-at-rubyconf-2014-will-ruby-3-dot-0-be-statically-typed/)
- [An open letter to Matz on Ruby type systems](https://tonyarcieri.com/an-open-letter-to-matz-on-ruby-type-systems)
- [Gradual Type Checking for Ruby](http://blog.codeclimate.com/blog/2014/05/06/gradual-type-checking-for-ruby/)
- [Types in Crystal](http://crystal-lang.org/2016/05/05/crystal-0.16.0-released.html)