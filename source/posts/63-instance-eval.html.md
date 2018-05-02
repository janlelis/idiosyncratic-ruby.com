---
title: idiosyncratic_eval
date: 2018-05-02
tags: core, meta
commit: 2cd53a45c8a1fc1378c7b37d162207bb3f964d0d
---

When you get farther upwards the steep hill that is Ruby mastery, you will come across some powerful, yet slightly evil methods: [instance_eval](https://ruby-doc.org/core/BasicObject.html#method-i-instance_eval) and [class_eval](https://ruby-doc.org/core/Module.html#method-i-class_eval)¹. They allow you to execute code and define methods tied to a specific class, at the same time giving you access to outer scope variables through the Ruby block syntax. Their exact behavior varies, depending on the context they are used in. So what is the difference between all the evals?

¹ Also aliased as `module_eval`

ARTICLE

## Eval / Method Definition Comparison

In the following tables, you will find all combinations of defining a methed and executing it in a different class context:

### Class Scope

Definition Method            | No `eval`                              | `class_eval`                                | `instance_eval`
-----------------------------|----------------------------------------|---------------------------------------------|------------------------
`def`                        | [instance](#class--def)                | [instance](#class--classeval--def)          | **[class](#class--instanceeval--def)**
`define_method`              | [instance](#class--definemethod)       | [instance](#class--classeval--definemethod) | [instance](#class--instanceeval--definemethod)
`def self.`                  | [class](#class--def-self)              | [class](#class--classeval--def-self)        | [class](#class--instanceeval--def-self)
`define_singleton_method`    | [class](#class--definesingletonmethod) | [class](#class--classeval--definesingletonmethod) | [class](#class--instanceeval--definesingletonmethod)

### Class-Class Scope (`class << self`)

Definition Method            | No `eval`                                          | `class_eval`                                                  | `instance_eval`
-----------------------------|----------------------------------------------------|---------------------------------------------------------------|------------------------
`def`                        | [class](#class-class--def)                         | [class](#class-class--classeval--def)                         | **[class-class](#class-class--instanceeval--def)**
`define_method`              | [class](#class-class--definemethod)                | [class](#class-class--classeval--definemethod)                | [class](#class-class--instanceeval--definemethod)
`def self.`                  | [class-class](#class-class--def-self)              | [class-class](#class-class--classeval--def-self)              | [class-class](#class-class--instanceeval--def-self)
`define_singleton_method`    | [class-class](#class-class--definesingletonmethod) | [class-class](#class-class--classeval--definesingletonmethod) | [class-class](#class-class--instanceeval--definesingletonmethod)

## Observations

While `class_eval` behaves exactly as if it was in no eval-context at all, `instance_eval` features a notable difference:
**<span class="action-color">def inside instance_eval will define methods one class-level higher</span>**. So when `instance_eval` is executed on instances, `def` will create instance methods instead of singleton methods. And when it is run on classes, `def` will create class methods instead of instance methods.

Another difference is that while [`class_eval` is defined on Module](https://ruby-doc.org/core/Module.html#method-i-class_eval), [`instance_eval` lives in BasicObject](https://ruby-doc.org/core/BasicObject.html#method-i-instance_eval) allowing you to use it on any object, not only modules and classes. However, there is a simple way to use `class_eval` for instances, too. You can explicitely use the object's singleton class (`class << self`), which is a module:

    o = Object.new # => #<Object:0x000055b6fdabf1f8>
    o.singleton_class.class_eval do
      def m
        p self
      end
    end

    o.m # => #<Object:0x000055b6fdabf1f8>

### Best Practice

Overall, the behavior of `instance_eval` is rather confusing and my recommendation is to avoid it and always use `class_eval`. If you do not need closure access, consider using no eval at all.

## Reference / Examples: Class-Level Scope

For reference, what follows is a list of snippets illustrating each *eval-define* combination.

### Class / `def`

Defines method on **instance**-level

    class C
      def m
        p self
      end
    end

    C.new.m # => #<C:0x0000556efd3eb1a8>

### Class / `class_eval` + `def`

Defines method on **instance**-level

    class C
      class_eval{
        def m
          p self
        end
      }
    end

    C.new.m # => #<C:0x0000556efd3eb1a8>

### Class / `instance_eval` + `def`

Defines method on **<span class="action-color">class</span>**-level

    class C
      instance_eval{
        def m
          p self
        end
      }
    end

    C.m # => C

### Class / `define_method`

Defines method on **instance**-level

    class C
      define_method(:m){
        p self
      }
    end

    C.new.m # => #<C:0x0000556efd3eb1a8>

### Class / `class_eval` + `define_method`

Defines method on **instance**-level

    class C
      class_eval{
        define_method(:m){
          p self
        }
      }
    end

    C.new.m # => #<C:0x0000556efd3eb1a8>

### Class / `instance_eval` + `define_method`

Defines method on **instance**-level

    class C
      instance_eval{
        define_method(:m){
          p self
        }
      }
    end

    C.new.m # => #<C:0x0000556efd3eb1a8>

### Class / `def self.`

Defines method on **class**-level

    class C
      def self.m
        p self
      end
    end

    C.m # => C

### Class / `class_eval` + `def self.`

Defines method on **class**-level

    class C
      class_eval{
        def self.m
          p self
        end
      }
    end

    C.m # => C

### Class / `instance_eval` + `def self.`

Defines method on **class**-level

    class C
      instance_eval{
        def self.m
          p self
        end
      }
    end

    C.m # => C

### Class / `define_singleton_method`

Defines method on **class**-level

    class C
      define_singleton_method(:m){
        p self
      }
    end

    C.m # => C

### Class / `class_eval` + `define_singleton_method`

Defines method on **class**-level

    class C
      class_eval{
        define_singleton_method(:m){
          p self
        }
      }
    end

    C.m # => C

### Class / `instance_eval` + `define_singleton_method`

Defines method on **class**-level

    class C
      instance_eval{
        define_singleton_method(:m){
          p self
        }
      }
    end

    C.m # => C

## Reference / Examples: Class-Class-Level Scope

### Class-Class / `def`

Defines method on **class**-level

    class C
      class << self
        def m
          p self
        end
      end
    end

    C.m # => C

### Class-Class / `class_eval` + `def`

Defines method on **class**-level

    class C
      class << self
        class_eval{
          def m
            p self
          end
        }
      end
    end

    C.m # => C

### Class-Class / `instance_eval` + `def`

Defines method on **<span class="action-color">class-class</span>**-level

    class C
      class << self
        instance_eval{
          def m
            p self
          end
        }
      end
    end

    C.singleton_class.m #=> #<Class:C>

### Class-Class / `define_method`

Defines method on **class**-level

    class C
      class << self
        define_method(:m){
          p self
        }
      end
    end

    C.m # => C

### Class-Class / `class_eval` + `define_method`

Defines method on **class**-level

    class C
      class << self
        class_eval{
          define_method(:m){
            p self
          }
        }
      end
    end

    C.m # => C

### Class-Class / `instance_eval` + `define_method`

Defines method on **class**-level

    class C
      class << self
        instance_eval{
          define_method(:m){
            p self
          }
        }
      end
    end

    C.m # => C

### Class-Class / `def self.`

Defines method on **class-class**-level

    class C
      class << self
        def self.m
          p self
        end
      end
    end

    C.singleton_class.m # => C

### Class-Class / `class_eval` + `def self.`

Defines method on **class-class**-level

    class C
      class << self
        class_eval{
          def self.m
            p self
          end
        end
      }
    end

    C.singleton_class.m #=> #<Class:C>

### Class-Class / `instance_eval` + `def self.`

Defines method on **class-class**-level

    class C
      class << self
        instance_eval{
          def self.m
            p self
          end
        }
      end
    end

    C.singleton_class.m #=> #<Class:C>

### Class-Class / `define_singleton_method`

Defines method on **class-class**-level

    class C
      class << self
        define_singleton_method(:m){
          p self
        }
      end
    end

    C.singleton_class.m # => C

### Class-Class / `class_eval` + `define_singleton_method`

Defines method on **class-class**-level

    class C
      class << self
        class_eval{
          define_singleton_method(:m){
            p self
          }
        }
      end
    end

    C.singleton_class.m #=> #<Class:C>

### Class-Class / `instance_eval` + `define_singleton_method`

Defines method on **class-class**-level

    class C
      class << self
        instance_eval{
          define_singleton_method(:m){
            p self
          }
        }
      end
    end

    C.singleton_class.m #=> #<Class:C>

## Also See

- Blog post: [Three implicit contexts in Ruby](http://blog.yugui.jp/entry/846)
- [Episode 25: Meta Methodology](/25-meta-methodology.html)