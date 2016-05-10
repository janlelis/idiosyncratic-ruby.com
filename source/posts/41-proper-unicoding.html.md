---
title: Proper Unicoding
date: 2016-05-10
tags: strings, regex, syntax, unicode
commit: 62921ea553e4bca13d08c5939052674cec0bf896
---

Ruby's Regexp engine has a powerful feature built in: It can match for [Unicode character properties](http://www.unicode.org/reports/tr44/#Property_List_Table). But what exactly are properties you can match for?

ARTICLE

The [Unicode consortium](http://unicode.org/) not only assigns all [codepoints](https://en.wikipedia.org/wiki/Code_point), it also publishes [additional data](http://www.unicode.org/Public/UNIDATA/) about their assigned characters. When searching through a string, Ruby allows you to utilize some of this extra knowledge.

## Property Regexp Syntax

Within a regular expression, use the `\p` directive:

- `/\p{ PROPERTY NAME }/`

To invert the property (matching characters that do **not** fit), you can either use a big `\P`:

- `/\P{ PROPERTY NAME }/`

Or add the `^` sign:

- `/\p{ ^PROPERTY NAME }/`

Ruby will strip all spaces, dashes, underscores from the given propertiy and convert it to a lowercased string. So the following examples are all valid syntax:

- `/\p{AGE = 6.3}/`
- `/\p{^In Supplementary Private Use Area-B}/`
- `/\p{In_Egyptian_Hieroglyphs}/`
- `/\P{inemoticons}/`
- `/\P{inno   block}/`
- `/\p{^zzzz}/`
- `/\p{ z___    y-y-y   }/`


## Supported Unicode Versions

Ruby Version | Unicode Version
-------------|----------------
**2.3**      | **8.0.0**
**2.2**      | **7.0.0**
**2.1**      | **6.1.0**

## List of Properties

### General Category

Each code point has a [General Category](https://en.wikipedia.org/wiki/Unicode_character_property#General_Category), one of the most basic categorizations. Codepoints without an explicit general category will implicitely get **Cn** (Unassigned):

    "Find decimal numbers (like 2 or 3)".scan(/\p{Nd}+/) # => ["2", "3"]

See the [Unicode::Categories](https://github.com/janlelis/unicode-categories) micro gem for a way find all general categories a string belongs to and a list of possible categories.

### Major Category

The Major category is basically the first letter of the general category:

- **L**: Letter
- **M**: Mark
- **N**: Number
- **P**: Punctuation
- **S**: Symbol
- **Z**: Separator
- **C**: Other

Example:

    "Find punctation characters (like : or ;)".scan(/\p{P}+/) # => ["(", ":", ";)"]

### Block

Unicode codepoints are also structured as [contiguous blocks](https://en.wikipedia.org/wiki/Unicode_block): Each codepoint is part of one or has the special value **No_Block**. To make the block name a Unicode property, you have to prefix it with "in":

    "Do not look directly into the ☼".scan /\p{In Miscellaneous Symbols}/ # => ["☼"]

See the [Unicode::Blocks](https://github.com/janlelis/unicode-blocks) micro gem for a way to retrieve the blocks of a string and a list of all valid block names.

### Script

The [script](https://en.wikipedia.org/wiki/Script_%28Unicode%29) of a character can also be matched:

    "ᴦ".scan/\p{Greek}/ # => "ᴦ"

See the [Unicode::Scripts](https://github.com/janlelis/unicode-scripts) micro gem for a way to find all scripts a string containso and a list of valid script names. A great way to explore the different scripts is [codepoints.net](https://codepoints.net/scripts).

### Age

The age property lets you find out the required Unicode version to display a string:

    "Train: 🛲 " =~ /\A\p{age=3.1}*\z/ # => nil
    "Train: 🛲 " =~ /\A\p{age=7.0}*\z/ # => 0

### Combined/POSIX like Properties

All properties of the [POSIX brackets syntax](http://www.regular-expressions.info/posixbrackets.html) are available with the `\p` syntax: For example, `[[:print:]]` simply becomes `\p{print}`. You can find the full list of properties in [Episode 30: Regex with Class](http://idiosyncratic-ruby.com/30-regex-with-class.html#posix-and--unicode-property-style).

### Derived Core Properties

These can be found in [DerivedCoreProperties.txt](http://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt) ([explanation](ftp://unicode.org/Public/3.2-Update/DerivedProperties-3.2.0.html)), along with a comment how the property gets constructed. Possible values are:

- Math
- Alphabetic
- Lowercase
- Uppercase
- Cased
- Case Ignorable
- Changes When Lowercased
- Changes When Uppercased
- Changes When Titlecased
- Changes When Casefolded
- Changes When Casemapped
- ID Start
- ID Continue
- XID Start
- XID Continue
- Default Ignorable Code Point
- Grapheme Extend
- Grapheme Base
- Grapheme Link

### Binary Properties

Other [matchable character properties](https://en.wikipedia.org/wiki/Unicode_character_property) are:

- Bidi Control
- Join Control
- Dash
- Hypen
- Quotation Mark
- Terminal Punctation
- Other Math
- Hex Digit
- Other Alphabetic
- Ideographic
- Diacritic
- Extender
- Other Lowercase
- Other Uppercase
- Noncharacter Code Point
- Other Grapheme Extend
- IDS Binary Operator
- IDS Trinary Operator
- Radical
- Unified Ideograph
- Other Default Ignorable Code Point
- Deprecated
- Soft Dotted
- Logical Order Exception
- Other ID Start
- Other ID Continue
- STerm
- Variation Selector
- Pattern White Space
- Pattern Syntax

## Resources

- [RDoc: Regexp (Character Properties)](http://ruby-doc.org/core-2.3.1/Regexp.html#class-Regexp-label-Character+Properties)
- [Source: tool/enc-unicode.rb](https://github.com/ruby/ruby/blob/trunk/tool/enc-unicode.rb)
- [Unicode® Standard Annex #44: Unicode Character Database](http://www.unicode.org/reports/tr44/)
- [Wikipedia: Unicode character property](https://en.wikipedia.org/wiki/Unicode_character_property)
- [Alternative: TwitterCldr Regexes](https://github.com/twitter/twitter-cldr-rb#unicode-regular-expressions)
- [Codepoint Browser](https://codepoints.net/)

