---
title: Goto Fail
date: 2015-05-24
tags: syntax, core, easter-egg
---

If you change one line in Ruby's source, it will support **goto** statements!

ARTICLE

You can install a patched version via **RVM**'s patch feature:

    $ rvm install 2.2.2 -n goto --patch http://git.io/vfxF2
    $ rvm use 2.2.2-goto

What to do to play around with this new feature? Let's reimplement [this famous bug](https://nakedsecurity.sophos.com/2014/02/24/anatomy-of-a-goto-fail-apples-ssl-bug-explained-plus-an-unofficial-patch/) in Ruby:

    # prepare some dummy data
    hashCtx = hashOut = clientRandom = serverRandom = signedRandom = Object.new
    SSLHashSHA1 = Class.new do def update(*) end; alias final update end.new

    # how the goto fail bug would look like if it was implemented in ruby
    __goto__(:fail) if ((err = SSLHashSHA1.update(hashCtx, clientRandom)) != 0);
    __goto__(:fail) if ((err = SSLHashSHA1.update(hashCtx, serverRandom)) != 0);
    __goto__(:fail) if ((err = SSLHashSHA1.update(hashCtx, signedParams)) != 0);
    __goto__(:fail);
    __goto__(:fail) if ((err = SSLHashSHA1.final(hashCtx, hashOut)) != 0);

    puts "Verified" # never reached
    # ...

    __label__(:fail);
    puts "Failed";

Executing this with gotoruby:

    $ rvm use 2.2.2-goto
    $ ruby gotofail.rb
    Failed


## Further Reading
- [Article: The Joke Is On Us: How Ruby 1.9 Supports the Goto Statement](http://patshaughnessy.net/2012/2/29/the-joke-is-on-us-how-ruby-1-9-supports-the-goto-statement)
- Ruby's other goto: [Article: Demystifying Continuations in Ruby](http://gnuu.org/2009/03/21/demystifying-continuations-in-ruby/)