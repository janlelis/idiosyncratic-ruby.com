---
title: Identification
date: 2016-05-04
tags: core, hash
commit: c46b41ba73f30ea9194b4398332ee6be04dfe543
---

Is it a hash? Or is it a hash?

ARTICLE

    hash = {"Idiosyncratic" => "Ruby"}
    hash["Idiosyncratic"] # => "Ruby"

    hash.compare_by_identity
    idiosyncratic_in_variable = "Idiosyncratic"
    hash[idiosyncratic_in_variable] # => nil
    hash["Idiosyncratic"] # => "Ruby"

[`Hash#compare_by_identity`](http://ruby-doc.org/core/Hash.html#method-i-compare_by_identity) changes the semantics of what is equal in a hash and what not. Only if exact the same object is passed in, the value will be retrieved.

**Please note:** The above example works for the key of`"Idiosyncratic"`, because every string literal returns the same object. This behaviour has been introduced with Ruby 2.2, so running it in 2.1 or lower will return `nil` for the last line.

## Hash Surprise

Identity hashes can feel very unnatural as the following snippet illustrates:

    hash = {}.compare_by_identity

    a="Idiosyncratic"
    b="Idiosyncratic"
    c="Idiosyncratic"

    hash[a] = "Ruby1"
    hash[b] = "Ruby2"
    hash[c] = "Ruby3"

    hash #=> {"Idiosyncratic"=>"Ruby1",
         #    "Idiosyncratic"=>"Ruby2",
         #    "Idiosyncratic"=>"Ruby3"}

    # Quiz: What is the result of: hash["Idiosyncratic"]

## Explicit Identity Hashes

What can be done to improve readability and reduce surprise? A starting point can be using an extra class:

    class IdentityHash < Hash
      def initialize(*)
        super.compare_by_identity
      end

      def inspect
        "#<IdentityHash: #{super}>"
      end
    end

For this class to be really useful it would need some more Hash-like features, like ActiveSupport does with [HashWithIndifferentAccess](https://github.com/rails/rails/blob/master/activesupport/lib/active_support/hash_with_indifferent_access.rb). Still, it is already less confusable than some hash that looks like a normal hash and that you haven't checked `compare_by_identity?` for.
