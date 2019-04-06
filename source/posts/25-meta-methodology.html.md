---
title: Meta Methodology
date: 2015-05-25
tags: core, meta
commit: d40b224596fdefcc1a380bf980ea4e1b92f82083
---

Ruby **clutters** its objects a lot with methods for metaprogramming other methods:

ARTICLE

    Class.instance_methods.grep /method/
    => [:instance_methods, :public_instance_methods,
    :protected_instance_methods, :private_instance_methods,
    :method_defined?, :public_method_defined?,
    :private_method_defined?, :protected_method_defined?,
    :public_class_method, :private_class_method, :instance_method,
    :public_instance_method, :methods, :singleton_methods,
    :protected_methods, :private_methods, :public_methods,
    :method, :public_method, :singleton_method,
    :define_singleton_method]

    Class.private_instance_methods.grep /method/
    => [:method_added, :method_removed, :method_undefined,
    :remove_method, :undef_method, :alias_method, :define_method,
    :instance_methods_for, :__method__, :singleton_method_added,
    :singleton_method_removed, :singleton_method_undefined,
    :method_missing]

It's so many methods, because working with methods is a multi-dimensional problem:

- Where are the modules, in the current instance or if a class/module, in its instances?
- Or in its [singleton class](https://www.devalot.com/articles/2008/09/ruby-singleton)?
- What about the method visibility?
- Should the inheritance chain be considered?

Let's put everything in some order:

## Method Lists

Methods returning method lists always take a boolean argument, which will prevent inheritance if set to `false`¹

Method                                                                                                            | From      | Target               | Visibility
------------------------------------------------------------------------------------------------------------------|-----------|----------------------|-------------------
[Object#singleton_methods](https://ruby-doc.org/core/Object.html#method-i-singleton_methods)                 | any       | singleton            | public + protected
[Object#methods](https://ruby-doc.org/core/Object.html#method-i-methods)                                     | any       | self + singleton     | public + protected
[Object#public_methods](https://ruby-doc.org/core/Object.html#method-i-public_methods)                       | any       | self + singleton     | public
[Object#protected_methods](https://ruby-doc.org/core/Object.html#method-i-protected_methods)                 | any       | self + singleton     | protected
[Object#private_methods](https://ruby-doc.org/core/Object.html#method-i-private_methods)                     | any       | self + singleton     | private
[Module#instance_methods](https://ruby-doc.org/core/Module.html#method-i-instance_methods)                   | class     | instances            | public + protected
[Module#public_instance_methods](https://ruby-doc.org/core/Module.html#method-i-public_instance_methods)     | class     | instances            | public
[Module#protected_instance_methods](https://ruby-doc.org/core/Module.html#method-i-protected_instance_methods) | class   | instances            | protected
[Module#private_instance_methods](https://ruby-doc.org/core/Module.html#method-i-private_instance_methods)   | class     | instances            | private
{:.table-38-15-20-X}

- There is no API for getting a list of private singleton methods
- ¹ A special case is the `methods` method: If `false` is given as argument, it will switch target to *singleton* only

## Method Defined? Checks

Instead of listing all methods and checking if the resulting array contains a specific method, you can also directly check if a method is defined.

Since Ruby 2.6, you can also pass in a boolean as second argument which will ignore the inheritance chain (similar like it is with the method listings above).

Method                                                                                                              | From  | Target   | Visibility
--------------------------------------------------------------------------------------------------------------------|-------|----------|-----------
[Module#method_defined?](https://ruby-doc.org/core/Module.html#method-i-method_defined-3F)                     | class | instances | all
[Module#public_method_defined?](https://ruby-doc.org/core/Module.html#method-i-public_method_defined-3F)       | class | instances | public
[Module#protected_method_defined?](https://ruby-doc.org/core/Module.html#method-i-protected_method_defined-3F) | class | instances | protected
[Module#private_method_defined?](https://ruby-doc.org/core/Module.html#method-i-private_method_defined-3F)     | class | instances | private
{:.table-38-15-20-X}

- This is also the best way to get the visibility of a method
- There is no direct way to check for singleton methods

## Method Getters

These methods will return method objects for further metaprogramming action:

Method                                                                                                      | From      | Target               | Visibility | Returns
------------------------------------------------------------------------------------------------------------|-----------|----------------------|------------|--------
[Object#singleton_method](https://ruby-doc.org/core/Object.html#method-i-singleton_method)             | any    | singleton            | all        | [Method](https://ruby-doc.org/core/Method.html)
[Object#method](https://ruby-doc.org/core/Object.html#method-i-method)                                 | any    | self + singleton | all        | [Method](https://ruby-doc.org/core/Method.html)
[Object#public_method](https://ruby-doc.org/core/Object.html#method-i-public_method)                   | any    | self + singleton | public     | [Method](https://ruby-doc.org/core/Method.html)
[Module#instance_method](https://ruby-doc.org/core/Module.html#method-i-instance_method)               | class     | instances            | all        | [UnboundMethod](https://ruby-doc.org/core/UnboundMethod.html)
[Module#public_instance_method](https://ruby-doc.org/core/Module.html#method-i-public_instance_method) | class     | instances            | public     | [UnboundMethod](https://ruby-doc.org/core/UnboundMethod.html)
{:.table-34-15-20-14-X}

- There are no methods to explicitly get private methods

## Method Manipulation

These methods will actually modify your objects:

Method                                                                                                        | From      | Target    | Visibility
--------------------------------------------------------------------------------------------------------------|-----------|-----------|-----------
[Object#define_singleton_method](https://ruby-doc.org/core/Object.html#method-i-define_singleton_method) | any       | singleton | public
[Module#define_method](https://ruby-doc.org/core/Module.html#method-i-define_method) (private)           | class     | instances | public (see notes)
[Module#remove_method](https://ruby-doc.org/core/Module.html#method-i-remove_method) (private)           | class     | instances | -
[Module#undef_method](https://ruby-doc.org/core/Module.html#method-i-undef_method) (private)             | class     | instances | -
[Module#alias_method](https://ruby-doc.org/core/Module.html#method-i-alias_method) (private)             | class     | instances | same
{:.table-38-15-20-X}

- No direct way to define a non-public method, but `define_method` respects visibility modifiers
- No direct way to define a non-public singleton method
- `remove_method` only deletes the method from the current module, while `undef_method` also deletes it from all ancestors

## Method Hooks

Hook methods can be defined and will be called by the Ruby interpreter when the respective event happens:

Method                                                                                                                        | From     | Target
------------------------------------------------------------------------------------------------------------------------------|----------|-------
[BasicObject#singleton_method_added](https://ruby-doc.org/core/BasicObject.html#method-i-singleton_method_added)         | any      | singleton
[BasicObject#singleton_method_undefined](https://ruby-doc.org/core/BasicObject.html#method-i-singleton_method_undefined) | any      | singleton
[BasicObject#singleton_method_removed](https://ruby-doc.org/core/BasicObject.html#method-i-singleton_method_removed)     | any      | singleton
[Module#method_added](https://ruby-doc.org/core/Module.html#method-i-method_added)                                       | class    | instances
[Module#method_undefined](https://ruby-doc.org/core/Module.html#method-i-method_undefined)                               | class    | instances
[Module#method_removed](https://ruby-doc.org/core/Module.html#method-i-method_removed)                                   | class    | instances
[BasicObject#method_missing](https://ruby-doc.org/core/BasicObject.html#method-i-method_missing)                         | class    | instances
{:.table-38-15-20-X}

- As long as you haven't defined a hook, Ruby considers it as an empty private method

## Method Visibility Modifiers

Besides `public`, `protected`, and `private`, there are two additional methods with the sole purpose of changing a method's visibility:

Method                                                                                                  | From  | Target    | Description
--------------------------------------------------------------------------------------------------------|-------|-----------|------------
[Module#public_class_method](https://ruby-doc.org/core/Module.html#method-i-public_class_method)   | class | singleton | Makes a class's singleton method public
[Module#private_class_method](https://ruby-doc.org/core/Module.html#method-i-private_class_method) | class | singleton | Makes a class's singleton method private
{:.table-34-12-12-X}

## Current Method Name

There are two underscore-wrapped methods that return the current method's name:

Method                                                                                            | From     | Returns
--------------------------------------------------------------------------------------------------|----------|--------
[Kernel#\_\_method\_\_](https://ruby-doc.org/core/Kernel.html#method-i-__method__) (private) | any     | Original method name
[Kernel#\_\_callee\_\_](https://ruby-doc.org/core/Kernel.html#method-i-__callee__) (private) | any     | Aliased method name
{:.table-35-20-X}

- Also see [Kernel#caller](https://ruby-doc.org/core/Kernel.html#method-i-caller) and [Kernel#caller_locations](https://ruby-doc.org/core/Kernel.html#method-i-caller_locations)

## A Better API for Metaprogramming Methods?

Metaprogramming in Ruby has evolved over time, but it might be a good idea to clean it up a little - A good example of how to clean up one of Ruby's other metaprogramming APIs is the [instance gem](https://github.com/rubyworks/instance/). It gives you a neat API for working with an object's state, like setting instance variables. Someone feels like building a similar gem for Ruby's Method APIs?
