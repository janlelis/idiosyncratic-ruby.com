---
title: Uniform Resource Matching
date: 2015-05-21
tags: stdlib, regex
commit: cb3a4428bb004ee39a8ab5edc834c00b9db2b157
---

Ruby's [URI standard library](https://ruby-doc.org/stdlib/libdoc/uri/rdoc/URI.html) contains a very sophisticated regex for matching URLs:

ARTICLE

    "At https://idiosyncratic-ruby.com you can learn about the " \
    "obscure parts of Ruby"[URI.regexp]
    # => "https://idiosyncratic-ruby.com"

This regex is built in [uri/rfc2396_parser.rb](https://github.com/ruby/ruby/blob/trunk/lib/uri/rfc2396_parser.rb) and looks like this:

    $ ruby -v
    ruby 2.2.2p95 (2015-04-13 revision 50295) [x86_64-linux]
    $ ruby -r uri -e 'p URI.regexp'
    /
            ([a-zA-Z][\-+.a-zA-Z\d]*):                           (?# 1: scheme)
            (?:
               ((?:[\-_.!~*'()a-zA-Z\d;?:@&=+$,]|%[a-fA-F\d]{2})(?:[\-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*)                    (?# 2: opaque)
            |
               (?:(?:
                 \/\/(?:
                     (?:(?:((?:[\-_.!~*'()a-zA-Z\d;:&=+$,]|%[a-fA-F\d]{2})*)@)?        (?# 3: userinfo)
                       (?:((?:(?:[a-zA-Z0-9\-.]|%\h\h)+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[(?:(?:[a-fA-F\d]{1,4}:)*(?:[a-fA-F\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-fA-F\d]{1,4}:)*[a-fA-F\d]{1,4})?::(?:(?:[a-fA-F\d]{1,4}:)*(?:[a-fA-F\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)\]))(?::(\d*))?))? (?# 4: host, 5: port)
                   |
                     ((?:[\-_.!~*'()a-zA-Z\d$,;:@&=+]|%[a-fA-F\d]{2})+)                 (?# 6: registry)
                   )
                 |
                 (?!\/\/))                           (?# XXX: '\/\/' is the mark for hostport)
                 (\/(?:[\-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*(?:;(?:[\-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*)*(?:\/(?:[\-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*(?:;(?:[\-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*)*)*)?                    (?# 7: path)
               )(?:\?((?:[\-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*))?                 (?# 8: query)
            )
            (?:\#((?:[\-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*))?                  (?# 9: fragment)
          /x

## Further Reading

- [Simpler regex to match a lot of URIs (you should increase the maximum length of TLDs, though)](http://www.regular-expressions.info/email.html)
- [RFC 2396](https://www.ietf.org/rfc/rfc2396.txt)
- [RFC 3986](https://tools.ietf.org/rfc/rfc3986.txt)