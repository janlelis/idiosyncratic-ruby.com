---
title: Nothing to Disable
date: 2020-08-11
tags: core, cli, stdlib
---

Ruby's mode of operation can be altered with some `--enable-*` / `--disable-*` command-line switches.

ARTICLE

By default, all of the following **features** are activated, except for the frozen strings and the JIT:

Feature    | CLI Option to Change | Description
-----------|------------------------|------------
[RubyGems](https://rubygems.org) | `--disable-gems` | RubyGems is the package manager of Ruby, which is required to load 3rd party Ruby libraries¹.
RUBYOPT | `--disable-rubyopt` | The RUBYOPT ENV variable lets you define default CLI options for Ruby. This switch tells Ruby to ignore RUBYOPT.
[DidYouMean](https://stdgems.org/did_you_mean) | `--disable-did-you-mean`² | Improves error messages by suggesting auto-corrected method or module names
Frozen strings | `--enable-frozen-string-literal`³ | Freezes all string literals everywhere.
Just-in-time compiler | `--enable-jit` | Shortcut to enable is just `--jit`. New compiler architecture, introduced with Ruby 2.6. See [@k0kubun's blog](https://medium.com/@k0kubun/jit-development-progress-at-ruby-2-7-d6dd62a8c76a) for more details.
All of the above | `--disable-all` / `--enable-all` | -
{:.table-20-35-X}

¹ `--disable-gems` will also prevent **did_you_mean** from loading, because it is a <a href="https://stdgems.org">standard gem</a><br/>
² Variants: `--disable-did_you_mean`, `--disable-did-you_`, `--disable-did`, `--disable-d` …<br/>
³ Variants: `--enable-frozen_string_literal`, `--enable-frozen_str`, `--enable-frozen`, …

## Also See

- [Episode 58: Magic Instructions](/58-magic-instructions.html)
- [Episode 53: The Constant Tree](/53-the-constant-tree.html)
- [Episode 43: New Ruby Startup](/43-new-ruby-startup.html)

