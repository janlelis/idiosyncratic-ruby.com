---
title: Regex with Class
date: 2015-05-30
tags: regex, strings, encoding
commit: 09d6cbfd1ca438d9999a6587d8c36b7fc3a120dc
---

Ruby's regex engine defines a lot of shortcut character classes. Besides the common meta characters (`\w`, etc.), there is also the [POSIX style expressions](http://www.regular-expressions.info/posix.html) and the [unicode property](https://en.wikipedia.org/wiki/Unicode_character_property) syntax. This is an overview of all character classes:

ARTICLE

## Meta Chars

Char           | Negation       | ASCII           | Unicode
---------------|----------------|-----------------|---------------------
`.`            | -              | ¹ Any           | ¹ Any
`\X`           | -              | Any             | [Grapheme clusters](http://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) (`\P{M}\p{M}*`)
`\d`           | `\D`           | `[0-9]`         | ² ASCII plus **Decimal\_Number** ([Nd](http://www.fileformat.info/info/unicode/category/Nd/list.htm))
`\h`           | `\H`           | `[0-9a-fA-F]`   | Like ASCII
`\w`           | `\W`           | `[0-9a-zA-Z_]`  | ² ASCII plus **Letter** ([LC](http://www.fileformat.info/info/unicode/category/LC/list.htm) / [Ll](http://www.fileformat.info/info/unicode/category/Ll/list.htm) / [Lm](http://www.fileformat.info/info/unicode/category/Lm/list.htm) / [Lo](http://www.fileformat.info/info/unicode/category/Lo/list.htm) / [Lt](http://www.fileformat.info/info/unicode/category/Lt/list.htm) / [Lu](http://www.fileformat.info/info/unicode/category/Lu/list.htm)), **Mark** ([Mc](http://www.fileformat.info/info/unicode/category/Mc/list.htm) / [Me](http://www.fileformat.info/info/unicode/category/Me/list.htm) / [Mn](http://www.fileformat.info/info/unicode/category/Mn/list.htm)), **Number** ([Nd](http://www.fileformat.info/info/unicode/category/Nd/list.htm) / [Nl](http://www.fileformat.info/info/unicode/category/Nl/list.htm) / [No](http://www.fileformat.info/info/unicode/category/No/list.htm)), **Connector\_Punctuation** ([Pc](http://www.fileformat.info/info/unicode/category/Pc/list.htm))
`\s`           | `\S`           | `[ \t\r\v\n\f]` | ² ASCII plus **Separator** ([Zl](http://www.fileformat.info/info/unicode/category/Zl/list.htm) / [Zp](http://www.fileformat.info/info/unicode/category/Zp/list.htm) / [Zs](http://www.fileformat.info/info/unicode/category/Zs/list.htm))
`\R`           | -              | `[\n\v\f\r]`,`\r\n` | ASCII plus ``, **Line_Separator** ([Zl](http://www.fileformat.info/info/unicode/category/Zl/list.htm)), **Paragraph_Separator** ([Zp](http://www.fileformat.info/info/unicode/category/Zp/list.htm))
{:.table-11-11-20-X}

¹ Will only match linebreaks with `/m` flag<br>
² You'll need to [manually turn on unicode matching](http://idiosyncratic-ruby.com/11-regular-extremism.html#turn-on-unicode-matching-for-w-d-s-and-b) for these to work

## POSIX and  Unicode Property Style

POSIX        | Negation     | Property     | Negation³    | ASCII | Unicode
-------------|--------------|--------------|--------------|-------|--------
`[:alnum:]`  | `[:^alnum:]` | `\p{Alnum}`  | `\p{^Alnum}` | `[0-9a-zA-Z]`  | **Letter** ([LC](http://www.fileformat.info/info/unicode/category/LC/list.htm) / [Ll](http://www.fileformat.info/info/unicode/category/Ll/list.htm) / [Lm](http://www.fileformat.info/info/unicode/category/Lm/list.htm) / [Lo](http://www.fileformat.info/info/unicode/category/Lo/list.htm) / [Lt](http://www.fileformat.info/info/unicode/category/Lt/list.htm) / [Lu](http://www.fileformat.info/info/unicode/category/Lu/list.htm)), **Mark** ([Mc](http://www.fileformat.info/info/unicode/category/Mc/list.htm) / [Me](http://www.fileformat.info/info/unicode/category/Me/list.htm) / [Mn](http://www.fileformat.info/info/unicode/category/Mn/list.htm)), **Decimal\_Number** ([Nd](http://www.fileformat.info/info/unicode/category/Nd/list.htm))
`[:alpha:]`  | `[:^alpha:]` | `\p{Alpha}`  | `\p{^Alpha}` | `[a-zA-Z]`     | **Letter** ([LC](http://www.fileformat.info/info/unicode/category/LC/list.htm) / [Ll](http://www.fileformat.info/info/unicode/category/Ll/list.htm) / [Lm](http://www.fileformat.info/info/unicode/category/Lm/list.htm) / [Lo](http://www.fileformat.info/info/unicode/category/Lo/list.htm) / [Lt](http://www.fileformat.info/info/unicode/category/Lt/list.htm) / [Lu](http://www.fileformat.info/info/unicode/category/Lu/list.htm)), **Mark** ([Mc](http://www.fileformat.info/info/unicode/category/Mc/list.htm) / [Me](http://www.fileformat.info/info/unicode/category/Me/list.htm) / [Mn](http://www.fileformat.info/info/unicode/category/Mn/list.htm))
`[:ascii:]`  | `[:^ascii:]` | `\p{ASCII}`  | `\p{^ASCII}` | `[\x00-\x7F]`  | Like ASCII
`[:blank:]`  | `[:^blank:]` | `\p{Blank}`  | `\p{^Blank}` | `[ \t]`        | `\t`, **Space\_Separator** ([Zs](http://www.fileformat.info/info/unicode/category/Zs/list.htm))
`[:cntrl`]   | `[:^cntrl:]` | `\p{Cntrl}`  | `\p{^Cntrl}` | `[\x00-\x1F]`, `\x7F` | **Other** ([Cc](http://www.fileformat.info/info/unicode/category/Cc/list.htm) / [Cf](http://www.fileformat.info/info/unicode/category/Cf/list.htm) / [Cn](http://www.fileformat.info/info/unicode/category/Cn/list.htm) / [Co](http://www.fileformat.info/info/unicode/category/Co/list.htm) / [Cs](http://www.fileformat.info/info/unicode/category/Cs/list.htm))
`[:digit:]`  | `[:^digit:]` | `\p{Digit}`  | `\p{^Digit}` | `[0-9]`        | ASCII plus **Decimal\_Number** ([Nd](http://www.fileformat.info/info/unicode/category/Nd/list.htm))
`[:graph:]`  | `[:^graph:]` | `\p{Graph}`  | `\p{^Graph}` | `[\x21-\x7E]`  | *NONE OF:* `\s`, **Control** ([Cc](http://www.fileformat.info/info/unicode/category/Cc/list.htm)), **Unassigned** ([Cn](http://www.fileformat.info/info/unicode/category/Cn/list.htm)), **Surrogate** ([Cs](http://www.fileformat.info/info/unicode/category/Cs/list.htm))
`[:lower:]`  | `[:^lower:]` | `\p{Lower}`  | `\p{^Lower}` | `[a-z]`        | **Lowercase\_Letter** ([Ll](http://www.fileformat.info/info/unicode/category/Ll/list.htm))
`[:print:]`  | `[:^print:]` | `\p{Print}`  | `\p{^Print}` | `[\x20-\x7E]`  | **Space\_Separator** ([Zs](http://www.fileformat.info/info/unicode/category/Zs/list.htm)), *NONE OF:* `\s`, **Control** ([Cc](http://www.fileformat.info/info/unicode/category/Cc/list.htm)), **Unassigned** ([Cn](http://www.fileformat.info/info/unicode/category/Cn/list.htm)), **Surrogate** ([Cs](http://www.fileformat.info/info/unicode/category/Cs/list.htm))
`[:punct:]`  | `[:^punct:]` | `\p{Punct}`  | `\p{^Punct}` | <code>[!-/:-@\[-`{-~]</code> | **Punctuation** ([Pc](http://www.fileformat.info/info/unicode/category/Pc/list.htm) / [Pd](http://www.fileformat.info/info/unicode/category/Pd/list.htm) / [Pe](http://www.fileformat.info/info/unicode/category/Pe/list.htm) / [Pf](http://www.fileformat.info/info/unicode/category/Pf/list.htm) / [Pi](http://www.fileformat.info/info/unicode/category/Pi/list.htm) / [Po](http://www.fileformat.info/info/unicode/category/Po/list.htm) / [Ps](http://www.fileformat.info/info/unicode/category/Ps/list.htm))
`[:space:]`  | `[:^space:]` | `\p{Space}`  | `\p{^Space}` | `[ \t\r\v\n\f]`| ASCII plus **Separator** ([Zl](http://www.fileformat.info/info/unicode/category/Zl/list.htm) / [Zp](http://www.fileformat.info/info/unicode/category/Zp/list.htm) / [Zs](http://www.fileformat.info/info/unicode/category/Zs/list.htm))
`[:upper:]`  | `[:^upper:]` | `\p{Upper}`  | `\p{^Upper}` | `[A-Z]`        | **Uppercase_Letter** ([Lu](http://www.fileformat.info/info/unicode/category/Lu/list.htm))
`[:xdigit:]` | `[:^xdigit:]`| `\p{XDigit}` | `\p{^XDigit}`| `[0-9a-fA-F]`  | Like ASCII
`[:word:]`   | `[:^word:]`  | `\p{Word}`   | `\p{^Word}`  | `[0-9a-zA-Z_]` | ASCII plus **Letter** ([LC](http://www.fileformat.info/info/unicode/category/LC/list.htm) / [Ll](http://www.fileformat.info/info/unicode/category/Ll/list.htm) / [Lm](http://www.fileformat.info/info/unicode/category/Lm/list.htm) / [Lo](http://www.fileformat.info/info/unicode/category/Lo/list.htm) / [Lt](http://www.fileformat.info/info/unicode/category/Lt/list.htm) / [Lu](http://www.fileformat.info/info/unicode/category/Lu/list.htm)), **Mark** ([Mc](http://www.fileformat.info/info/unicode/category/Mc/list.htm) / [Me](http://www.fileformat.info/info/unicode/category/Me/list.htm) / [Mn](http://www.fileformat.info/info/unicode/category/Mn/list.htm)), **Number** ([Nd](http://www.fileformat.info/info/unicode/category/Nd/list.htm) / [Nl](http://www.fileformat.info/info/unicode/category/Nl/list.htm) / [No](http://www.fileformat.info/info/unicode/category/No/list.htm)), **Connector\_Punctuation** ([Pc](http://www.fileformat.info/info/unicode/category/Pc/list.htm))
{:.table-13-13-13-13-20-X}

³ An alternative way of negating unicode properties is `\P{Property}`

### More Properties

The above groups are only the tip of the iceberg. Using the `\p{}` syntax, you can match for a lot more unicode properties, see [Episode 41: Proper Unicoding](/41-proper-unicoding.html) for details!

## Further Reading

- [Onigmo Documentation](https://github.com/k-takata/Onigmo/blob/master/doc/RE)
- [Unicode Character Property Model](http://unicode.org/reports/tr23/)
- [RDoc: Regexp (Character Properties)](http://ruby-doc.org/core-2.3.0/Regexp.html#class-Regexp-label-Character+Properties)
- [Unicode Data](http://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt)
- [Unicode Property List](http://www.unicode.org/Public/UCD/latest/ucd/PropList.txt)
- [Unicode Property Aliases](http://www.unicode.org/Public/UCD/latest/ucd/PropertyAliases.txt)
- [Unicode Property Values Aliases](http://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)
