---
title: Unicode Version Mapping
date: 2020-08-14
tags: regex, unicode
commit: 62a61f5ddd7f886b0a5713d7d791ddc8039accf3
---

The Ruby core team cares a lot about Unicode, and this is why we have [pretty good Unicode support](/66-ruby-has-character.html) in the language.

Even though the Unicode standard evolves constantly - it gets updated at least once a year - Ruby's Unicode support is often only a little bit behind the current version of Unicode. The following tables list which Ruby version supports which version of Unicode / Emoji:

ARTICLE

## Ruby / Unicode

Ruby Version | Unicode Version
-------------|----------------
**3.3**      | **15.0.0**
**3.2**      | **15.0.0**
**3.1**      | **13.0.0**
**3.0**      | **12.1.0**
**2.7**      | **12.1.0**
**2.6.3+**   | **12.1.0**¹
**2.6.2**    | **12.0.0**
**2.6.1-**   | **11.0.0**
**2.5**      | **10.0.0**
**2.4**      | **9.0.0**
**2.3**      | **8.0.0**
**2.2**      | **7.0.0**
**2.1**      | **6.1.0**
**2.0**      | **6.1.0**
**1.9**      | **5.2.0**

¹ Unicode 12.1 [introduced a single character](https://unicode.org/versions/Unicode12.1.0/#Summary)

Starting with Ruby 2.4, you can find out your Ruby version's Unicode support with:

    RbConfig::CONFIG["UNICODE_VERSION"]


## Ruby / Emoji

Ruby Version | Emoji Version
-------------|----------------
**3.3**      | **15.0**
**3.2**      | **15.0**
**3.1**      | **13.1**
**3.0**      | **12.1**
**2.7**      | **12.1**
**2.6.2+**   | **12.0**
**2.6.1-**   | **11.0**
**2.5**      | **5.0**

Starting with Ruby 2.6, you can find out your Ruby version's Emoji support with:

    RbConfig::CONFIG["UNICODE_EMOJI_VERSION"]

## Also See

- [unicode-version](https://github.com/janlelis/unicode-version): These tables available as a gem
- [unicode-emoji](https://github.com/janlelis/unicode-emoji): Regular Expression for Unicode Emoji
- [unicode-x](https://github.com/janlelis/unicode-x): More micro libraries which provide latest Unicode data