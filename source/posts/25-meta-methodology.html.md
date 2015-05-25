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
- Or in its [singleton class](http://www.devalot.com/articles/2008/09/ruby-singleton)?
- What about the method visibility?
- Should the inheritance chain be considered?

Let's put everything in some order:

## Method Lists

Methods returning method lists always take a boolean argument, which will prevent inheritance if set to `false`

Method                                                                                                            | From      | Target               | Visibility
------------------------------------------------------------------------------------------------------------------|-----------|----------------------|-------------------
[Object#singleton_methods](http://ruby-doc.org/core-2.2.2/Object.html#method-i-singleton_methods)                 | instance  | singleton            | public + protected
[Object#methods](http://ruby-doc.org/core-2.2.2/Object.html#method-i-methods)                                     | instance  | instance + singleton | public + protected
[Object#public_methods](http://ruby-doc.org/core-2.2.2/Object.html#method-i-public_methods)                       | instance  | instance + singleton | public
[Object#protected_methods](http://ruby-doc.org/core-2.2.2/Object.html#method-i-protected_methods)                 | instance  | instance + singleton | protected
[Object#private_methods](http://ruby-doc.org/core-2.2.2/Object.html#method-i-private_methods)                     | instance  | instance + singleton | private
[Module#instance_methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-instance_methods)                   | class     | instance             | public + protected
[Module#public_instance_methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public_instance_methods)     | class     | instance             | public
[Module#proected_instance_methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-proected_instance_methods) | class     | instance             | proected
[Module#private_instance_methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-private_instance_methods)   | class     | instance             | private
{:.table-38-15-20-X}

- There is no API for getting a list of private singleton methods

## Method Defined? Checks

Instead of listing all methods and checking if the resulting array contains a specific method, you can also directly check if a method is defined:

Method                                                                                                              | From  | Target   | Visibilitiy
--------------------------------------------------------------------------------------------------------------------|-------|----------|------------
[Module#method_defined?](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_defined-3F)                     | class | instance | all
[Module#public_method_defined?](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public_method_defined-3F)       | class | instance | public
[Module#protected_method_defined?](http://ruby-doc.org/core-2.2.2/Module.html#method-i-protected_method_defined-3F) | class | instance | protected
[Module#private_method_defined?](http://ruby-doc.org/core-2.2.2/Module.html#method-i-private_method_defined-3F)     | class | instance | private
{:.table-38-15-20-X}

- This is also the best way to get the visibility of a method
- There is no direct way to check for singleton methods

## Method Getters

These methods will return method objects for further metaprogramming action:

Method                                                                                                      | From      | Target               | Visibility | Returns
------------------------------------------------------------------------------------------------------------|-----------|----------------------|------------|--------
[Object#singleton_method](http://ruby-doc.org/core-2.2.2/Object.html#method-i-singleton_method)             | instance  | singleton            | all        | [Method](http://ruby-doc.org/core-2.2.2/Method.html)
[Object#method](http://ruby-doc.org/core-2.2.2/Object.html#method-i-method)                                 | instance  | instance + singleton | all        | [Method](http://ruby-doc.org/core-2.2.2/Method.html)
[Object#public_method](http://ruby-doc.org/core-2.2.2/Object.html#method-i-public_method)                   | instance  | instance + singleton | public     | [Method](http://ruby-doc.org/core-2.2.2/Method.html)
[Module#instance_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-instance_method)               | class     | instance             | all        | [UnboundMethod](http://ruby-doc.org/core-2.2.2/UnboundMethod.html)
[Module#public_instance_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public_instance_method) | class     | instance             | public     | [UnboundMethod](http://ruby-doc.org/core-2.2.2/UnboundMethod.html)
{:.table-34-15-20-14-X}

- There are no methods to explicitely get private methods

## Method Manipulation

These methods will actually modify your objects:

Method                                                                                                        | From      | Target    | Visibility
--------------------------------------------------------------------------------------------------------------|-----------|-----------|-----------
[Object#define_singleton_method](http://ruby-doc.org/core-2.2.2/Object.html#method-i-define_singleton_method) | instance  | singleton | public
[Module#define_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-define_method) (private)           | class     | instance  | public (see notes)
[Module#remove_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-remove_method) (private)           | class     | instance  | -
[Module#undef_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-undef_method) (private)             | class     | instance  | -
[Module#alias_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-alias_method) (private)             | class     | instance  | same
{:.table-38-15-20-X}

- No direct way to define a non-public method, but `define_method` respects visibility modifiers
- No direct way to define a non-public singleton method
- `remove_method` only deletes the method from the current module, while `undef_method` also deletes it from all ancestors

## Method Hooks

Hook methods can be defined and will be called by the Ruby interpreter when the respective event happens:

Method                                                                                                                        | From     | Target
------------------------------------------------------------------------------------------------------------------------------|----------|-------
[BasicObject#singleton_method_added](http://ruby-doc.org/core-2.2.2/BasicObject.html#method-i-singleton_method_added)         | instance | singleton
[BasicObject#singleton_method_undefined](http://ruby-doc.org/core-2.2.2/BasicObject.html#method-i-singleton_method_undefined) | instance | singleton
[BasicObject#singleton_method_removed](http://ruby-doc.org/core-2.2.2/BasicObject.html#method-i-singleton_method_removed)     | instance | singleton
[Module#method_added](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_added)                                       | class    | instance
[Module#method_undefined](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_undefined)                               | class    | instance
[Module#method_removed](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_removed)                                   | class    | instance
[BasicObject#method_missing](http://ruby-doc.org/core-2.2.2/BasicObject.html#method-i-method_missing)                         | class    | instance
{:.table-38-15-20-X}

- As long as you haven't defined a hook, Ruby considers it as an empty private method

## Method Visibility Modifiers

Besides `public`, `protected`, and `private`, there are two additional methods with the sole purpose of changing a method's visibility:

Method                                                                                                  | From  | Target    | Description
--------------------------------------------------------------------------------------------------------|-------|-----------|------------
[Module#public_class_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public_class_method)   | class | singleton | Makes a class's singleton method public
[Module#private_class_method](http://ruby-doc.org/core-2.2.2/Module.html#method-i-private_class_method) | class | singleton | Makes a class's singleton method private
{:.table-34-12-12-X}

## Current Method Name

There are two underscore-wrapped methods that return the current method's name:

Method                                                                                            | From     | Returns
--------------------------------------------------------------------------------------------------|----------|--------
[Kernel#\_\_method\_\_](http://ruby-doc.org/core-2.2.2/Kernel.html#method-i-__method__) (private) | anywhere | Original method name
[Kernel#\_\_callee\_\_](http://ruby-doc.org/core-2.2.2/Kernel.html#method-i-__callee__) (private) | anywhere | Aliased method name
{:.table-35-20-X}

- Also see [Kernel#caller](http://ruby-doc.org/core-2.2.2/Kernel.html#method-i-caller) and [Kernel#caller_locations](http://ruby-doc.org/core-2.2.2/Kernel.html#method-i-caller_locations)

## A Better API for Metaprogramming Methods?

Metaprogramming in Ruby has evolved over time, but it might be a good idea to clean it up a little - A good example of how to clean up one of Ruby's other metaprogramming APIs is the [instance gem](https://github.com/rubyworks/instance/). It gives you a neat API for working with an object's state, like setting instance variables. Someone feels like building a similar gem for Ruby's Method APIs?
