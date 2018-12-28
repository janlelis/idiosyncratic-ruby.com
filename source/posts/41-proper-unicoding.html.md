---
title: Proper Unicoding
date: 2016-05-10
tags: strings, regex, syntax, unicode
commit: 62921ea553e4bca13d08c5939052674cec0bf896
---

Ruby's Regexp engine has a powerful feature built in: It can match for [Unicode character properties](https://www.unicode.org/reports/tr44/#Property_List_Table). But what exactly are properties you can match for?

ARTICLE

The [Unicode consortium](https://unicode.org/) not only assigns all [codepoints](https://en.wikipedia.org/wiki/Code_point), it also publishes [additional data](https://www.unicode.org/Public/UNIDATA/) about their assigned characters. When searching through a string, Ruby allows you to utilize some of this extra knowledge.

## Property Regexp Syntax

Within a regular expression, use the `\p` directive:

- `/\p{ PROPERTY NAME }/`

To invert the property (matching characters that do **not** fit), you can either use a big `\P`:

- `/\P{ PROPERTY NAME }/`

Or add the `^` sign:

- `/\p{ ^PROPERTY NAME }/`

Ruby will strip all spaces, dashes, underscores from the given property and convert it to a lowercased string. So the following examples are all valid syntax:

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
**2.6**      | **11.0.0**
**2.5**      | **10.0.0**
**2.4**      | **9.0.0**
**2.3**      | **8.0.0**
**2.2**      | **7.0.0**
**2.1**      | **6.1.0**

## List of Properties as of Ruby 2.6 / Unicode 11.0

### General Category

Each code point has a [General Category](https://en.wikipedia.org/wiki/Unicode_character_property#General_Category), one of the most basic categorizations. Codepoints without an explicit general category will implicitly get **Cn** (Unassigned):

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

    "Find punctuation characters (like : or ;)".scan(/\p{P}+/) # => ["(", ":", ";)"]

### Block

Unicode codepoints are also structured as [contiguous blocks](https://en.wikipedia.org/wiki/Unicode_block): Each codepoint is part of one or has the special value **No_Block**. To make the block name a Unicode property, you have to prefix it with "in":

    "Do not look directly into the ☼".scan /\p{In Miscellaneous Symbols}/ # => ["☼"]

See the [Unicode::Blocks](https://github.com/janlelis/unicode-blocks) micro gem for a way to retrieve the blocks of a string and a list of all valid block names.

### Script

The [script](https://en.wikipedia.org/wiki/Script_%28Unicode%29) of a character can also be matched:

    "ᴦ".scan/\p{Greek}/ # => "ᴦ"

See the [Unicode::Scripts](https://github.com/janlelis/unicode-scripts) micro gem for a way to find all scripts a string contains and a list of valid script names. A great way to explore the different scripts is [codepoints.net](https://codepoints.net/scripts).

### Age

The age property lets you find out the required Unicode version to display a string:

    "Train: 🛲 " =~ /\A\p{age=3.1}*\z/ # => nil
    "Train: 🛲 " =~ /\A\p{age=7.0}*\z/ # => 0

### Combined/POSIX like Properties

All properties of the [POSIX brackets syntax](http://www.regular-expressions.info/posixbrackets.html) are available with the `\p` syntax: For example, `[[:print:]]` simply becomes `\p{print}`. You can find the full list of properties in [Episode 30: Regex with Class](https://idiosyncratic-ruby.com/30-regex-with-class.html#posix-and--unicode-property-style).

### Generic Properties

- Any
- Assigned

While `\p{Any}` will just match any representable codepoint, `\p{Assigned}` will ignore [*Reserved* codepoints and *Non-Characters*](/66-ruby-has-character.html#types-of-unstandardized-codepoints)

### Derived Core Properties

These can be found in [DerivedCoreProperties.txt](https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt) ([explanation](ftp://unicode.org/Public/3.2-Update/DerivedProperties-3.2.0.html)), along with a comment how the property gets constructed. Possible values are:

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

### Grapheme Related

Ruby's regex engine supports [matching for grapheme clusters](/66-ruby-has-character.html#grapheme-clusters) using `\X`. But it can also match for very specific grapheme related properties:

- Grapheme Cluster Break = Prepend
- Grapheme Cluster Break = CR
- Grapheme Cluster Break = LF
- Grapheme Cluster Break = Control
- Grapheme Cluster Break = Extend
- Grapheme Cluster Break = Regional Indicator
- Grapheme Cluster Break = SpacingMark
- Grapheme Cluster Break = L
- Grapheme Cluster Break = V
- Grapheme Cluster Break = T
- Grapheme Cluster Break = LV
- Grapheme Cluster Break = LVT
- Grapheme Cluster Break = ZWJ

### Binary Properties

Other [matchable character properties](https://en.wikipedia.org/wiki/Unicode_character_property) are:

- White Space
- Bidi Control
- Join Control
- Dash
- Hyphen
- Quotation Mark
- Terminal Punctuation
- Other Math
- Hex Digit
- ASCII Hex Digit
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
- Sentence Terminal
- Variation Selector
- Pattern White Space
- Pattern Syntax
- Prepended Concatenation Mark
- Regional Indicator

## Emoji Properties

Also see: [unicode-emoji](https://github.com/janlelis/unicode-emoji)

- Emoji
- Emoji Presentation
- Emoji Modifier
- Emoji Modifier_Base
- Emoji Component
- Extended Pictographic

## Resources

- [RDoc: Regexp (Character Properties)](https://ruby-doc.org/core/Regexp.html#class-Regexp-label-Character+Properties)
- [Source: tool/enc-unicode.rb](https://github.com/ruby/ruby/blob/trunk/tool/enc-unicode.rb)
- [Unicode® Standard Annex #44: Unicode Character Database](https://www.unicode.org/reports/tr44/)
- [Wikipedia: Unicode character property](https://en.wikipedia.org/wiki/Unicode_character_property)
- [Alternative: TwitterCldr Regexes](https://github.com/twitter/twitter-cldr-rb#unicode-regular-expressions)
- [Codepoint Browser](https://codepoints.net/)
