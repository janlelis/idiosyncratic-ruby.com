---
title: Symbolic Validations
date: 2016-05-09
tags: core, syntax, symbols
commit: 636170b3c5e21288c5ebdc522806150090db0fde
---

When exactly don't you have to `:"escape"` a Ruby symbol?

ARTICLE

Because this question is somehow related to the Ruby interpreter's internal usage of symbols, the rules are not the most obvious ones:

- `:` + Identifier¹, optionally appended by `!`, `?`, or `=` (→ methods)
- `:@` + Identifier¹ (→ instance variables)
- `:@@` + Identifier¹ (→ class variables)
- `:$` + Identifier¹ (→ global variables)
- `:$` + Single identifier¹ character or `0-9` (→ [Perl-style special variables](http://idiosyncratic-ruby.com/9-globalization.html))
- `:$-` + Single identifier¹ character or `0-9` (→ [Ruby interpreter CLI options](http://idiosyncratic-ruby.com/9-globalization.html#other-special-global-variables))
- `:!`, `:!=`, `:!~`, `:%`, `:&`, `:*`, `:+`, `:-`, `:/`, `:<`, `:>`, `:^`, <code>:`</code>, `:|`, `:~`, `:$!`, `:$"`, `:$$`, `:$&`, `:$'`, `:$*`, `:$+`, `:$,`, `:$.`, `:$/`, `:$:`, `:$;`, `:$<`, `:$=`, `:$>`, `:$?`, `:$@`, `:$\`, <code>:$`</code>, `:$~`, `:**`, `:+@`, `:-@`, `:<<`, `:<=`², `:<=>`², `:==`, `:===`, `:=~`, `:>=`, `:>>`, `:[]`, `:[]=`

¹ Valid for identifiers: `A-Z`, `a-z`, `0-9`, `_`, non-ASCII characters. Not allowed to start with `0-9`.<br/>
² [Example of a syntactical edge case that is not 100% clear](http://idiosyncratic-ruby.com/29-limitations-of-language.html#no-simple-rule-if-a-symbol-can-be-displayed-without-the-explicit--syntax)
