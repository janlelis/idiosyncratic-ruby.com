---
title: Constant Visibility
date: 2016-05-21
tags: core, constants
commit: b55cbe7b47d3ce740f67c090093518547f16d176
---

It is less common, but similar to methods, constants have a visibility attached to them. You have the choice between **private** and **public**, and you can also mark a constant **deprecated**!

ARTICLE

Like with methods, the default visibility of a constant is **public**. Unlike methods, [which have a lot of associated methods for metaprogramming](/25-meta-methodology.html), working with constants is easier:

    Module.methods.grep /const/
    => [:const_get, :constants, :const_defined?, :const_set, :private_constant,
    :public_constant, :deprecate_constant, :const_missing]

    Module.private_methods.grep /const/
    => [:remove_const]

Besides some minor idiosyncrasies (like the visibility modifiers, which where introduced at a later time, refer to constants with *constant*, while the others just use *const*), their usage is straight forward.

## Effects of Visibility Modifications

You must create a constant before you can modify its visibility. When a constant exists, you can use the class method [`private_constant`](http://ruby-doc.org/core-2.3.1/Module.html#method-i-private_constant) or [`deprecate_constant`](http://ruby-doc.org/core-2.3.1/Module.html#method-i-deprecate_constant) to alter its behaviour. You can change **private** visibility back to the original state using the [`public_constant`](http://ruby-doc.org/core-2.3.1/Module.html#method-i-public_constant) method. You cannot "undeprecate" constants.

### Public

This is the default behavior, the constant can be referenced from anywhere and shows up in the [`constants`](http://ruby-doc.org/core-2.3.1/Module.html#method-i-constants) list:

    module Namespace
      module Public
      end
    end

    Namespace::Public # => Namespace::Public

    Namespace.const_defined?(:Public) # => true
    Namespace.constants.include?(:Public) # => true

### Private

The constant cannot referenced via the `::` operator and does not show up in the constants list. They can still be accessed from within the namespace and via [`const_get`](http://ruby-doc.org/core-2.3.1/Module.html#method-i-const_get):

    module Namespace
      module Private
      end

      private_constant :Private
    end

    Namespace::Private # NameError: private constant Namespace::Private referenced

    module Namespace
      Private # => Namespace::Private
    end

    Namespace.const_defined?(:Private) # => true
    Namespace.constants.include?(:Private) # => false

    Namespace.const_get(:Private) # => Namespace::Private

### Deprecated

This is an additional property, which is also stored in a constant's visibility flag. Whenever you reference it, it will output a ([$VERBOSE level independent](http://idiosyncratic-ruby.com/3-ruby-can-you-speak-louder.html#verbosity)) warning:

    module Namespace
      module Deprecated
      end

      deprecate_constant :Deprecated
    end

    Namespace::Deprecated # => Namespace::Deprecated
    # warning: constant Namespace::Deprecated is deprecated

    Namespace.const_defined? :Deprecated # => true
    Namespace.constants.include? :Deprecated # => true

## More about Constants

- [RDoc: Modules (Constants)](http://ruby-doc.org/core-2.3.1/doc/syntax/modules_and_classes_rdoc.html#label-Constants)
- [Everything you ever wanted to know about constant lookup in Ruby](http://cirw.in/blog/constant-lookup.html)
- [Constants can be redefined and removed](/45-constant-shuffle.html)
