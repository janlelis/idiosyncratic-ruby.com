---
title: Self Improvement
date: 2015-05-08
tags: core, inheritance
commit: 7923275d6bfce595c3f0a0f1d9eceaa6dae43800
---

One of the never-ending style battles in Ruby land is `module_function` vs `extend self`.

ARTICLE

Both enable you to define module methods, which can be called not only from instance level, but also from class level. This enables you to make modules that can optionally be `include`'d into your current scope, which makes sense if the module contains non-state changing methods ("functions"). Not having to prepend the module name every time you use the functions saves time and looks good:

    # class level
    Mathematics.calc # => 42

    # instance level
    include Mathematics
    calc # => 42

## `module_function`

You can achieve this kind of functionality using:

    module Mathematics
      module_function

      def calc
        42
      end
    end

Which is very similar to writing this:

    module Mathematics
      def self.calc
        42
      end

      private

      def calc
        42
      end
    end

### Reflection Observations

    Mathematics.instance_method(:calc).owner #=> Mathematics
    Mathematics.public_method_defined?(:calc) #=> false
    Mathematics.private_method_defined?(:calc) #=> true

    Mathematics.method(:calc).owner #=> #<Class:Mathematics>
    Mathematics.method(:calc).owner.singleton_class? #=> true


Two things to take away from this:

- The method will be copied to class' singleton class
- The instance method's visibility will become private


## `extend self`

There is another way to get something very similar:

    module Mathematics
      extend self

      def calc
        42
      end
    end

Using [extend](http://ruby-doc.org/core-2.3.0/Object.html#method-i-extend), the module will add its instance methods to the module's very own inheritance chain.

### Reflection Observations

    Mathematics.instance_method(:calc).owner #=> Mathematics
    Mathematics.public_method_defined?(:calc) #=> true
    Mathematics.private_method_defined?(:calc) #=> false

    Mathematics.method(:calc).owner #=> Mathematics
    Mathematics.method(:calc).owner.singleton_class? #=> false

The differences to `module_function` are:

- No method copying involved
- No changes to method visibility

## Which One to Use?

### Advantages of `extend self`

- No method copying: If you want to modify a method's behavior via meta-programming, you only need to do this in one place
- No side effects, like changing the method's visibility
- It is no extra language feature

### Adavantages of `module_function`

- The method name "module_function" describes what it does, so it might be better readable
- Making included methods private [might be desired](https://github.com/janlelis/idiosyncratic-ruby.com/commit/7923275d6bfce595c3f0a0f1d9eceaa6dae43800#commitcomment-11553416)


## Resources

- [Blog post on Ruby Best Practices about extend self](http://blog.rubybestpractices.com/posts/gregory/040-issue-10-uses-for-modules.html)
- [Blog post on Ruby Best Practices about module_function](http://blog.rubybestpractices.com/posts/gregory/041-issue-10.5-uses-for-modules.html)